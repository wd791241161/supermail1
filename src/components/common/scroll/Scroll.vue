<template>
  <div class="wrapper" ref="wrapper">
     <div class="content">
       <slot></slot>
     </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:'',
    data(){
      return{
          scroll:null,
          
       }
    },
    props:{
       probeType:{
            type: Number,
            default: 0
          },
          pullUpLoad:{
            type:Boolean,
            default:false
          }
    },
    mounted(){
      //创建 BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad,
        click:true
      })
      //监听滚动位置
      //console.log(this.probeType);
      if(this.probeType == 2 || this.probeType == 3){
          this.scroll.on('scroll',(position) => {
          this.$emit('scroll',position)
        })
      }
      
      //监听上拉事件
      if(this.pullUpLoad){
          this.scroll.on('pullingUp',() => {
          this.$emit('pullingUp')
        })
      }
      
      
    },
    methods:{
      scrollTo(x, y, time=300){
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      refresh(){
        //console.log('-------');
       this.scroll && this.scroll.refresh()
      },
      getScrollY(){
       return this.scroll ? this.scroll.y : 0
      }
    }
  }


</script>
<style scoped>
</style>