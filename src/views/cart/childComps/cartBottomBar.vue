<template>
  <div class="bottom-bar">
     <div class="check-content">
       <check-button :is-check="isSelectAll" 
                     class="check-button"
                     @click.native="checkClick">
       </check-button>
       <span>全选</span>
     </div>

     <div class="price">
       总价:{{totalPrice}}
     </div>

     <div class="calculate" @click="calcClick">
       去计算：{{checkLength}}
     </div>
  </div>
</template>

<script>
import checkButton from 'components/content/checkButton/checkButton'
import {mapGetters} from 'vuex'

export default {
    name:'',
    computed:{
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
           return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength() {
        return this.cartList.reduce((sum,item) => item.checked ? sum+=item.count : sum ,0)
      },
      isSelectAll() {
        //if (this.cartList.length === 0) return false
       //return !(this.cartList.filter(item => !item.checked).length)
        // if (this.cartList.length === 0) return false
        // return !this.cartList.find(item => !item.checked)
        if (this.cartList.length === 0) return false
        for(let item of this.cartList) {
          if(!item.checked)
          return false
        }
          return true
     }
    },
    methods:{
      checkClick() {
        if (this.isSelectAll) {
          this.cartList.forEach(item => item.checked = false)
        } else {
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick(){
        if(!this.isSelectAll) {
          this.$toast.show('请选择购买的商品', 1500)
        }
      }
    },
    components:{
      checkButton
    },
    data(){
      return{
       }
    }
  }


</script>
<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    
  }

  .price {
    margin-left: 30px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: #f20;
    color: #fff;
  }
</style>