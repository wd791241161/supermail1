<template>
  <div class="wrapper">
     <ul class="conten">
       <li>1滚动</li>
       <li>2滚动</li>
       <li>3滚动</li>
       <li>4滚动</li>
       <li>5滚动</li>
       <li>6滚动</li>
       <li>7滚动</li>
       <li>8滚动</li>
       <li>9滚动</li>
       <li>10滚动</li>
       <li>11滚动</li>
       <li>12滚动</li>
       <li>13滚动</li>
       <li>14滚动</li>
       <li>15滚动</li>
       <li>16滚动</li>
       <li>17滚动</li>
       <li>18滚动</li>
       <li>19滚动</li>
       <li>20滚动</li>
       <li>21滚动</li>
       <li>22滚动</li>
       <li>23滚动</li>
       <li>24滚动</li>
       <li>25滚动</li>
       <li>26滚动</li>
       <li>27滚动</li>
       <li>28滚动</li>
       <li>29滚动</li>
       <li>30滚动</li>
       <li>31滚动</li>
       <li>32滚动</li>
       <li>33滚动</li>
       <li>34滚动</li>
       <li>35滚动</li>
       <li>36滚动</li>
       <li>37滚动</li>
       <li>38滚动</li>
       <li>39滚动</li>
       <li>40滚动</li>
       <li>41滚动</li>
       <li>42滚动</li>
       <li>43滚动</li>
       <li>44滚动</li>
       <li>45滚动</li>
       <li>46滚动</li>
       <li>47滚动</li>
       <li>48滚动</li>
       <li>49滚动</li>
       <li>50滚动</li>
       <li>51滚动</li>
       <li>52滚动</li>
       <li>53滚动</li>
       <li>54滚动</li>
       <li>55滚动</li>
       <li>56滚动</li>
       <li>57滚动</li>
       <li>58滚动</li>
       <li>59滚动</li>
       <li>60滚动</li>
       <li>61滚动</li>
       <li>62滚动</li>
       <li>63滚动</li>
       <li>64滚动</li>
       <li>65滚动</li>
       <li>66滚动</li>
       <li>67滚动</li>
       <li>68滚动</li>
       <li>69滚动</li>
       <li>70滚动</li>
       <li>71滚动</li>
       <li>72滚动</li>
       <li>73滚动</li>
       <li>74滚动</li>
       <li>75滚动</li>
       <li>76滚动</li>
       <li>77滚动</li>
       <li>78滚动</li>
       <li>79滚动</li>
       <li>80滚动</li>
       <li>81滚动</li>
       <li>82滚动</li>
       <li>83滚动</li>
       <li>84滚动</li>
       <li>85滚动</li>
       <li>86滚动</li>
       <li>87滚动</li>
       <li>88滚动</li>
       <li>89滚动</li>
       <li>90滚动</li>
       <li>91滚动</li>
       <li>92滚动</li>
       <li>93滚动</li>
       <li>94滚动</li>
       <li>95滚动</li>
       <li>96滚动</li>
       <li>97滚动</li>
       <li>98滚动</li>
       <li>99滚动</li>
       <li>100滚动</li>
     </ul>
  </div>
</template>

<script>
import BScroll, { PullUpLoad } from 'better-scroll'

// const bscroll = new BScroll(document.querySelector('.wrapper'),{
//   probeType:3,
//   click:true,
//   pullUpLoad:true
// })

// bscroll.on('scroll',(position) => {
//   console.log(position);
// })

// bscroll.on('pullingUp',() =>{
//   console.log('加载更多');

//   setTimeout(() => {
//     bscroll.finishPullUp()
//   },2000)
// })

export default {
    name:'Category',
    data(){
      return{
          scroll:null
       }
    },
    mounted(){
      this.scroll = new BScroll(document.querySelector('.wrapper'),{
      probeType:3,
      pullUpLoad:true
      })
      this.scroll.on('scroll',(position) => {
        console.log(position);
      })
      this.scroll.on('pullingUp',() => {
         console.log('上拉加载');
      })
    }
  }


</script>
<style scoped>
  .wrapper {
    height: 200px;
    background-color: #f60;
    overflow: hidden;
  }
</style>