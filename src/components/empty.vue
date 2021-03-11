<template>
  <div class="empty" :style="`padding:${paddingData}rem`">
    <svg-icon value="icon-wushuju" :size="8"></svg-icon>
    <p>{{tips}}</p>
  </div>
</template>
<script>
export default {
  name:"empty",
  props:{
    tips:{
      type:String,
      default:null
    },
    paddingData:{
      type:Number,
      default:5
    }
  }
}
</script>
<style lang="less" scoped>
.empty{
  text-align: center;
  p{
    color: #aaaaaa;
  }
}
</style>