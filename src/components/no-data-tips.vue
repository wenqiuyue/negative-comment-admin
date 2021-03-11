<template>
  <div class="no-data-tips">
    <span>{{text}}</span>
  </div>
</template>
<script>
export default {
  name:'no-data-tips',
  props:{
    text:{
      type:String,
      default:'暂无数据'
    }
  }
}
</script>
<style lang="less" scoped>
.no-data-tips{
  padding: 20px;
  text-align: center;
  font-size: 14px;
}
</style>