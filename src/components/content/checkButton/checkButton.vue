<template>
  <div class="check-button" :class="{check:isCheck}">
     <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
    name:'',
    props:{
      isCheck:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return{
       }
    }
  }

</script>
<style scoped>
  .check-button{
    border-radius: 50%;
    border: 2px solid #aaa;
  }

  .check {
    border-color: #f00;
    background-color: #f00;
  }
</style>