import {debounce} from './utils';
import BackTop from 'components/content/backtop/BackTop'

export const itemListenerMixin = {
  // components:{},
  // methods:{},
  data(){
    return {
      itemImgListener: null,
      refresh:null
    }
  },
  mounted(){
   //console.log('我是混入的内容');
    this.refresh = debounce(this.$refs.scroll.refresh,50)

    this.itemImgListener = () => {
        this.refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)
  }
}

export const backTopMixin = {
  data(){
    return {
      isShowBackTop: false,
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0, 0)
    },
  },
  components:{
    BackTop
  }
}