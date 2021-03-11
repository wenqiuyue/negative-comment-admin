<template>
  <div class="analystics">
    <div class="echar" v-loading="reviewNumLoading">
      <div class="echar_title" v-if="reviewNumData">
        <div class="echar_title_l">
          Reviews-{{reviewNumData.total}}
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content" style="width:210px;word-break:break-all">Monitor the number of reviews your business receives and your average rating over times</div>
            <i class="el-icon-info"></i>
          </el-tooltip>
        </div>
        <el-date-picker
          @change="datePickerChange(1)"
          v-model="reviewNumDate"
          type="monthrange"
          range-separator="-"
          start-placeholder="Start month"
          end-placeholder="End month">
        </el-date-picker>
      </div>
      <div id="reviewNum" style="width: 100%;height:450px;"></div>
    </div>
    <div class="echar" v-loading="totalRatingLoading">
      <div class="echar_title">
        <div class="echar_title_l">
          Total reviews by rating
        </div>
        <el-date-picker
          @change="datePickerChange(2)"
          v-model="totalRatingDate"
          type="monthrange"
          range-separator="-"
          start-placeholder="Start month"
          end-placeholder="End month">
        </el-date-picker>
      </div>
      <div class="stars_list">
        <el-steps align-center>
          <el-step :title="`${item.value}`" :description="`${item.name.split('-')[0]} STARS`" icon="el-icon-edit" v-for="(item,index) in totalRatingData" :key="index">
            <svg-icon slot="icon" value="icon-xingxing" :size="2"></svg-icon>
          </el-step>
        </el-steps>
      </div>
      <div id="totalRating" style="width: 100%;height:400px; top:-70px"></div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      reviewNumDate:[], //评论条数图标日期
      totalRatingDate:[],
      reviewNumLoading:false,
      totalRatingLoading:false,
      reviewNumData:null, //柱状图数据
      totalRatingData:null, //饼状图数据
      echarts:null
    }
  },
  created(){
    this.echarts = require('echarts');
  },
  mounted(){
    this.getAnalysticBrokenLine();
    this.getAnalysticPieChart();
  },
  methods:{
    /**
     * 时间选择切换
     * 1、柱状图  2、饼状图
     */
    datePickerChange(type){
      if(type==1){
        this.getAnalysticBrokenLine();
      }else{
        this.getAnalysticPieChart();
      }
    },
    /**
     * 柱状图数据
     */
    getAnalysticBrokenLine(){
      const data={
        startTime: this.reviewNumDate.length>0?this.reviewNumDate[0].timeFormat('yyyy-MM'):null,
        endTime: this.reviewNumDate.length>0?this.reviewNumDate[1].timeFormat('yyyy-MM'):null
      }
      this.reviewNumLoading=true;
      this.$apiHttp.siteAnalysticBrokenLine({params:data}).then((resp)=>{
        if(resp.res==200){
          this.reviewNumData = resp.data;
          this.reviewNumEcharts();
        }
      }).finally(()=> this.reviewNumLoading=false);
    },
    /**
     * 饼状图数据
     */
    getAnalysticPieChart(){
      const data={
        startTime: this.totalRatingDate.length>0?this.totalRatingDate[0].timeFormat('yyyy-MM'):null,
        endTime: this.totalRatingDate.length>0?this.totalRatingDate[1].timeFormat('yyyy-MM'):null
      }
       this.totalRatingLoading=true;
      this.$apiHttp.siteAnalysticPieChart({params:data}).then((resp)=>{
        if(resp.res==200){
          this.totalRatingData = resp.data;
          this.totalRatingEcharts();
        }
      }).finally(()=> this.totalRatingLoading=false);
    },
    /**
     * 柱状图
     */
    reviewNumEcharts(){
      // 基于准备好的dom，初始化echarts实例
		  var myChart = this.echarts.init(document.getElementById('reviewNum'));

		  // 指定图表的配置项和数据
		  var option = {
			  tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        toolbox: {
          padding: [0,40,0,0],
          itemGap: 16,
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
			  legend: {
           x: 'center',
           y:'bottom',
				  data:this.reviewNumData.title
			  },
			  xAxis: {
          type: 'category',
				  data: this.reviewNumData.dateTime
			  },
			  yAxis: [
          {
            type: 'value',
            name: '#Reviews',
          },
          {
              type: 'value',
              name: 'Rating',
              min: 0,
              max: 5,
          }
        ],
			  series: this.reviewNumData.series
		  };
		  // 使用刚指定的配置项和数据显示图表。
		  myChart.setOption(option);
      },

      totalRatingEcharts(){
      // 基于准备好的dom，初始化echarts实例
		  var myChart =this.echarts.init(document.getElementById('totalRating'));

		  // 指定图表的配置项和数据
		  var option = {
			  tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}'
        },
			  legend: {
          // orient: 'vertical',
          bottom: 10,
          left: 'center',
				  data:['1-star','2-star','3-star','4-star','5-star']
			  },
			  series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.totalRatingData,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
          }]
		  };
		  // 使用刚指定的配置项和数据显示图表。
		  myChart.setOption(option);
		}
  }
  
}
</script>
<style lang="less" scoped>
.analystics{
  padding:10px;
  background: #F9F9F9;
  .echar{
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    border: 1px solid #ebeef5;
    padding: 22px;
    margin-bottom: 8px;
    .echar_title{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 20px;
      .echar_title_l{
        color: #89847B;
        font-size: 24px;
        font-weight: bold;
      }
    }
    .stars_list{
      margin: 35px 0;
      /deep/.is-wait{
        color: #4E4E4F;
      }
    }
  }
}
@media all and (max-width: 1024px) {
  .analystics{
    padding:8px;
    .echar{
      padding: 22px 12px;
      .echar_title{
        flex-wrap: wrap;
        .echar_title_l{
          margin-bottom: 5px;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
