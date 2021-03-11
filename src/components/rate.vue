<template>
  <el-rate
    class="c_t_rate"
    v-model="value"
    :icon-classes="iconClasses"
    void-icon-class="iconfont icon-pingfendengjiRating4"
    :colors="colorDef"
    :disabled="isDisabled"
    disabled-void-color="rgb(198, 209, 222)"
    disabled-void-icon-class="iconfont icon-pingfendengjiRating4"
    allow-half
  >
  </el-rate>
</template>
<script>
export default {
  name:'rate',
  props:{
    value:{
      type:Number,
      default:null
    },
    isDisabled:{
      type:Boolean,
      default:false
    },
  },
  data(){
    return{
      iconClasses: ['iconfont icon-pingfendengjiRating4', 'iconfont icon-pingfendengjiRating4', 'iconfont icon-pingfendengjiRating4'],
    }
  },
  computed:{
    colorDef(){
      if(this.value>0&&this.value<=1){
        return ['#FF3722','#FF3722','#FF3722'];
      }else if(this.value>1&&this.value<=2){
        return ['#FF8622','#FF8622','#FF8622'];
      }else if(this.value>2&&this.value<=3){
        return ['#FFCE00','#FFCE00','#FFCE00'];
      }else if(this.value>3&&this.value<=4){
        return ['#73CF11','#73CF11','#73CF11'];
      }else if(this.value>4&&this.value<=5){
        return ['#00B67A','#00B67A','#00B67A'];
      }
    }
  },
  methods:{
    
  }
}
</script>
<style lang="less" scoped>
</style>