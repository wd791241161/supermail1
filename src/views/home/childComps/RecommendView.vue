<template>
  <div class="recommend">
     <div class="recommend-item" v-for="(item,index) in recommends" :key="index">
       <a :href="item.link">
         <img :src="item.image" alt="">
       </a>
       <div>{{item.title}}</div>
     </div>
  </div>
</template>

<script>
export default {
    name:'',
    data(){
      return{
          
       }
    },
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }


</script>
<style scoped>
  .recommend{
    width:100%;
    display: flex;
    text-align: center;
    padding: 10px 0 30px;
    border-bottom: 8px solid #eee;
    font-size: 12px;
  }
  .recommend-item{
    flex: 1;
  }
  .recommend img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>