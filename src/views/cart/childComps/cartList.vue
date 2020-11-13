<template>
  <div class="cart-list">
     <scroll class="content" ref="scroll">
       <cart-list-item 
            v-for="(item, index) in cartList" 
            :key="index"
            :itemInfo="item">
       </cart-list-item>
     </scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Scroll from 'components/common/scroll/Scroll'
import cartListItem from './cartListItem'


export default {
    name:'',
    computed:{
      ...mapGetters(['cartList'])
    },
    components:{
      Scroll,
      cartListItem
    },
    activated() {
      this.$refs.scroll.refresh()
    },
    data(){
      return{
       }
    }
  }


</script>v
<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }

  .content {
    height: 100%; 
    overflow: hidden;
  }
</style>