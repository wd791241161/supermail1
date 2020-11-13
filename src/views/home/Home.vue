<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control 
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
      >
      </tab-control>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadmore"
            >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control 
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl2"
      >
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    
  </div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'


import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'

export default {
    name:'Home',
    data(){
      return{
          banners:[],
          recommends:[],
          goods:{
            'pop': {page:0, list:[]},
            'new': {page:0, list:[]},
            'sell': {page:0, list:[]}
          },
          currentType: 'pop',
          
          tabOffsetTop: 0,
          isTabFixed: false,
          saveY: 0,
       }
    },
    mixins:[itemListenerMixin, backTopMixin],
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      //BackTop
    },
    created(){
      this.getHomeMultidata()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted(){
      //组件挂载完成后时就监听图片加载问题,然后刷新
      // const refresh = debounce(this.$refs.scroll.refresh,50)
      
      // this.itemImgListener = () => {
      //    refresh()
      // }
      // this.$bus.$on('itemImageLoad',this.itemImgListener)
      // //获取tabControl的offsetTop
      // //console.log(this.$refs.tabControl.$el.offsetTop);
    },
    methods:{
      /**
       * 处理监听事件
       */
      tabClick(index){
         switch(index){
           case 0:
             this.currentType = 'pop'
             break
           case 1:
             this.currentType = 'new'
             break
           case 2:
             this.currentType = 'sell'
             break
         }
         this.$refs.tabControl1.currentIndex = index;
         this.$refs.tabControl2.currentIndex = index;
      },
      
      contentScroll(position){
        //console.log(111);
        //判断返回顶部图标是否显示
        this.isShowBackTop = (-position.y) > 1000
        //判断tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadmore(){
        //第一步：先监听什么时候加载完
        this.getHomeGoods(this.currentType)
        //第二步：加载完进行刷新
        this.$refs.scroll.scroll.refresh()
      },
      swiperImageLoad(){
        
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /**
       * 接收数据
       */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
       })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          //上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },
      
    },
    destroyed(){
      console.log('home 离开');
    },
    activated(){
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      //保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
      //取消全局事件的监听
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    computed:{
      showGoods(){
       return this.goods[this.currentType].list
      }
    }
  }


</script>
<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
  }
  
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */

  .home-nav{
    background: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }

  .tab-control{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  
</style>