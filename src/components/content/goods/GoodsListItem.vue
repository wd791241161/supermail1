<template>
  <div class="goods-item" @click="itemClick">
     <img v-lazy="showImage" @load="imageLoad" alt="">
     <div class="goods-info">
       <p>{{goodsItem.title}}</p>
       <span class="price">{{goodsItem.price}}</span>
       <span class="collect">{{goodsItem.cfav}}</span>
     </div>
  </div>
</template>

<script>
export default {
    name:'GoodsListItem',
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods:{
      imageLoad(){
        this.$bus.$emit('itemImageLoad')

        // if(this.$route.path.indexOf('/home')) {
        //   this.$bus.$emit('hoemItemImageLoad')
        // }else if(this.$route.path.indexOf('/detail')) {
        //   this.$bus.$emit('detailItemImageLoad')
        // }
        
      },
      itemClick(){
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    },
    data(){
      return{
          
       }
    }
  }


</script>
<style scoped>
  .goods-item{
    position: relative;
    padding-bottom: 40px;
    width: 48%;
    
  }

  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }

  .goods-info{
    position: absolute;
    font-size: 12px;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    position: absolute;
    content: '';
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>