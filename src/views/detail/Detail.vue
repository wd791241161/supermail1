<template>
  <div id="detail">
    <detail-nav-bar 
            class="detail-nav" 
            @titleClick="titleClick"
            ref="nav">
    </detail-nav-bar>
    <scroll class="content" 
            ref="scroll" 
            @scroll="contentScroll" 
            :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
//import BackTop from 'components/content/backtop/BackTop'
//import Toast from 'components/common/toast/Toast'

import { mapActions } from 'vuex'
import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'

export default {
    name:'Detail',
    data(){
      return{
         iid:null,
         topImages:[],
         goods:{},
         shop:{},
         detailInfo:{},
         paramInfo:{},
         commentInfo:{},
         recommends:[],
         themeTopYs:[],
         getThemeTopY:null,
         currentIndex:0,
         //isShowBackTop: false,
         //  message:'',
         //  show:false
       }
    },
    mixins:[itemListenerMixin, backTopMixin],
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      Scroll,
      //BackTop
      //Toast
    },
    methods:{
      imageLoad() {
        this.refresh()
        this.getThemeTopY()
      },
      // backClick(){
      //   this.$refs.scroll.scrollTo(0, 0)
      // },
      titleClick(index){
        //console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position){
        //判断返回图标是否显示
        this.isShowBackTop = (-position.y) > 1000
        //1，获取y值
        const positionY = -position.y
        //2，positionY和主题中值进行对比
        //[0, 500, 800, 1000]
        // positionY 在 0 和 500 之间，index = 0
        // positionY 在 500 和 800 之间，index = 1
        // positionY 在 800 和 1000 之间，index = 2
        // positionY 在大于等于1000 时，index = 3
        let length = this.themeTopYs.length

        for(let i = 0; i < length-1; i++){
          if(this.currentIndex !== i &&(positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
     

          // if(this.currentIndex !== i && ((i < length -1 && positionY >= this.themeTopYs[i] 
          //    && positionY < this.themeTopYs[i+1]) || (i === length -1 &&positionY >= this.themeTopYs))) {
          //      this.currentIndex = i;
          //      this.$refs.nav.currentIndex = this.currentIndex
          //    }
        }
        //
        //
        //
        //
      },
      ...mapActions(['addCart']),
      addToCart(){
        //获取购物车里需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //将商品添加到购物车里
        //this.$store.commit('addCart',product)

        this.addCart(product).then(res => {

          this.$toast.show(res, 1500)
          //console.log(this.$toast);
          // this.message = res;
          // this.show = true

          // setTimeout(() => {
          //   this.show = false
          //   this.message = ''
          // },1500)
          // console.log(res);
        })

        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // })
      }
    },
    created(){
      //保存传入的iid
       this.iid = this.$route.params.iid
       //根据iid请求详情数据
       getDetail(this.iid).then(res => {
         const data = res.result;
         this.topImages = data.itemInfo.topImages
       //获取商品信息
         this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
       //创建商品的对象
         this.shop = new Shop(data.shopInfo)
       //保存商品的详情数据
         this.detailInfo = data.detailInfo;
         //保存参数信息的展示
         this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
         //取出评论的信息
         if(data.rate.cRate !== 0) {
           this.commentInfo = data.rate.list[0]
         }
          // this.$nextTick(() => {
          //   //根据最新的数据，dom渲染完成，但是图片并没有加载完成
            
          //   this.themeTopYs.push(0)
          //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
          //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          //   console.log(this.themeTopYs);
          // })
          
       })
      //请求推荐数据
       getRecommend().then(res => {
         //console.log(res);
         this.recommends = res.data.list
       })

       //给getThemeTopY赋值
       this.getThemeTopY = debounce(() => {
         this.themeTopYs.push(0)
         this.themeTopYs.push(this.$refs.param.$el.offsetTop)
         this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
         this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
         this.themeTopYs.push(Number.MAX_VALUE)
         console.log(this.themeTopYs);
       },200)
       
    },
    mounted(){
      
    },
    destroyed (){
       this.$bus.$off('itemImageLoad',this.itemImgListener)
      //console.log('离开');
    },
    
  }


</script>
<style scoped>
  #detail {
    position: relative;
    overflow: hidden;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>