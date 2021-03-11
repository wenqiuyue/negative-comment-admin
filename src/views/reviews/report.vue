<template>
  <div class="report">
    <div class="screen">
      <div class="screen_l">
        <el-date-picker
          @change="getReport"
          class="date"
          v-model="datePicker"
          type="daterange"
          range-separator="-"
          start-placeholder="Start date"
          end-placeholder="End date">
        </el-date-picker>
        <el-dropdown split-button size="small" type="primary" trigger="click" :hide-on-click="false" ref="status">
          Report & Review status
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-checkbox :indeterminate="isStatusIndeterminate" v-model="checkAllStatus" @change="handleStatusCheckAllChange">Select all</el-checkbox>
            </el-dropdown-item>
            <el-dropdown-item divided class="checkbox_dro">
              <el-checkbox-group v-model="checkedStatus" @change="handleCheckedStatusChange">
                <el-checkbox v-for="(item,index) in statusOption" :label="item.id" :key="item.id">{{item.content}}</el-checkbox>
              </el-checkbox-group>
            </el-dropdown-item>
            <el-dropdown-item divided class="menu_btn">
              <el-button plain size="mini" @click="handleApply(3)">Apply</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown split-button size="small" type="primary" trigger="click" :hide-on-click="false" ref="star">
          Star rating
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-checkbox :indeterminate="isStarIndeterminate" v-model="checkAllStar" @change="handleStarCheckAllChange">Select all</el-checkbox>
            </el-dropdown-item>
            <el-dropdown-item divided class="checkbox_dro">
              <el-checkbox-group v-model="checkedStar" @change="handleCheckedStarChange">
                <el-checkbox v-for="(item,index) in starOption" :label="item.id" :key="item.id">{{item.content}}</el-checkbox>
              </el-checkbox-group>
            </el-dropdown-item>
            <el-dropdown-item divided class="menu_btn">
              <el-button plain size="mini" @click="handleApply(1)">Apply</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown split-button size="small" type="primary" trigger="click" :hide-on-click="false" ref="report">
          Reporting reason
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-checkbox :indeterminate="isReportReasonIndeterminate" v-model="checkAllReportReason" @change="handleReportReasonCheckAllChange">Select all</el-checkbox>
            </el-dropdown-item>
            <el-dropdown-item divided class="checkbox_dro">
              <el-checkbox-group v-model="checkedReportReason" @change="handleCheckedReportReasonChange">
                <el-checkbox v-for="(item,index) in reportReasonOption" :label="item.id" :key="item.id">{{item.content}}</el-checkbox>
              </el-checkbox-group>
            </el-dropdown-item>
            <el-dropdown-item divided class="menu_btn">
              <el-button plain size="mini" @click="handleApply(2)">Apply</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown split-button size="small" type="primary" trigger="click" :hide-on-click="false" ref="whoreport">
          User who reported
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-checkbox :indeterminate="isReportReasonIndeterminate" v-model="checkAllWho" @change="handleWhoCheckAllChange">Select all</el-checkbox>
            </el-dropdown-item>
            <el-dropdown-item divided class="checkbox_dro">
              <el-checkbox-group v-model="checkedWho" @change="handleCheckedWhoChange">
                <el-checkbox v-for="(item,index) in whoOption" :label="item.id" :key="item.id">
                  {{item.name}}
                  <div>({{item.eamil}})</div>
                </el-checkbox>
              </el-checkbox-group>
            </el-dropdown-item>
            <el-dropdown-item divided class="menu_btn">
              <el-button plain size="mini" @click="handleApply(4)">Apply</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>      
      </div>
    </div>
    <div class="card_group" v-if="tableData">
      <el-row :gutter="16" class="card_row">
        <el-col :span="12" :xs="24">
          <div class="card">
            <span>{{tableData.numberOfReports}}</span> 
            <span>Number of reports</span>
          </div>
        </el-col>
        <el-col :span="12" :xs="24">
          <div class="card">
            <span>{{tableData.reportsUnderInvestigation}}</span> 
            <span>Reports under investigation</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="16" class="card_row">
        <el-col :span="12" :xs="24">
          <div class="tow_card">
            <div class="card">
              <span>{{tableData.reportsClosedButReviewOnline}}</span> 
              <span>Reports closed, review still online</span>
            </div>
            <div class="card_item">
              <p>
                <span>{{tableData.invalidReports}}</span> 
                <span>Invalid reports (reviews not in breach)</span>
              </p>
              <p>
                <span>{{tableData.issue}}</span> 
                <span>Issue addressed by the reviewer</span>
              </p>
            </div>
          </div>
        </el-col>
        <el-col :span="12" :xs="24">
          <div class="card last_card">
            <span>{{tableData.reviewsTakenOffline}}</span> 
            <span>Reviews taken offline</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="report_group" v-loading="loading">
      <el-table
        v-if="tableData && tableData.reportData.length"
        :data="tableData.reportData"
        :cell-style="attenceCellStyle"
        :header-cell-style="attenceHeaderStyle"
        style="width: 100%">
        <el-table-column
          prop="online"
          width="50"
          class="online_col"
         >
          <template slot-scope="scope">
            <div v-if="scope.row.reportAndReviewStatusId==2" class="online"></div>
            <div v-else class="unline"></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="Report & Review status"
          width="180"
         >
          <template slot-scope="scope">
            <div v-if="scope.row.reportAndReviewStatusId==0">Investigating report</div>
            <div v-else-if="scope.row.reportAndReviewStatusId==1">Report closed - Review offine</div>
            <div v-else-if="scope.row.reportAndReviewStatusId==2">Report closed - still online</div>
            <div class="dialog_text" v-if="scope.row.reportAndReviewStatusId==2"><span @click="handleSee(scope.row)">See the review</span></div>
            <div class="dialog_text" v-if="scope.row.reportAndReviewStatusId==2"><span @click="handleWhy(scope.row)">Why is it still online?</span></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="lastStatusChangeTime"
          label="Last status change"
          width="170"
          sortable>
          <template slot-scope="scope">
            <span>{{scope.row.lastStatusChangeTime?scope.row.lastStatusChangeTime.timeFormat('yyyy-MM-dd'):'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="dateOfTheReportTime"
          sortable
          width="170"
          label="Date of the report">
          <template slot-scope="scope">
            <span>{{scope.row.dateOfTheReportTime?scope.row.dateOfTheReportTime.timeFormat('yyyy-MM-dd'):'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="rank"
          sortable
          width="150"
          label="Star rating">
          <template slot-scope="scope">
            <rate
              class="c_rate"
              :value="scope.row.reviews.rank"
              :isDisabled="true"
            >
            </rate>
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          width="230"
          label="Reporting reason">
          <template slot-scope="scope">
            <div class="reason">{{scope.row.reportingReason}}</div>
            <div class="content">{{scope.row.content}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          width="180"
          label="User who reported">
          <template slot-scope="scope">
            <div>{{scope.row.reportUser.name}}</div>
            <div>({{scope.row.reportUser.eamil}})</div>
          </template>
        </el-table-column>
        <el-table-column></el-table-column>
      </el-table>
      <empty v-else :tips="'No data available'"></empty>
      <div class="pagination" v-if="page.pageTotal/page.pageSize>1 && !loading">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageIndex"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="prev, pager, next"
          :total="page.pageTotal">
        </el-pagination>
      </div>
    </div>
    <SeeDialog ref="seedialog" :seeReviews="seeReviews"></SeeDialog>
    <WhyDialog ref="whydialog" :seeReviews="seeReviews"></WhyDialog>
  </div>
</template>
<script>
export default {
  components:{
    SeeDialog:()=> import('./see-dialog'),
    WhyDialog:()=> import('./why-dialog'),
  },
  props:{
    whoOption:{
      type:Array,
      default:[]
    },
    reportReasonOption:{
      type:Array,
      default:[]
    },
    statusOption:{
      type:Array,
      default:[]
    }
  },
  data(){
    return{
      loading:true,
      datePicker:[],
      checkedReportReason:[], //选择的举报原因
      checkAllReportReason: false, //举报原因是否全选
      isReportReasonIndeterminate:true,
      starOption:[{
        id: 1, content: "1 STARS"
      },
      {
        id: 2, content: "2 STARS"
      },
      {
        id: 3, content: "3 STARS"
      },
      {
        id: 4, content: "4 STARS"
      },
      {
        id: 5, content: "5 STARS"
      },
      ], //星级选项
      checkedStar:[], //选择的星级
      checkAllStar: false, //星级是否全选
      isStarIndeterminate:true,
      checkedStatus:[], //选择的status
      checkAllStatus: false, //status是否全选
      isStatusIndeterminate:true,
      checkedWho:[], //选择的举报人
      checkAllWho: false, //举报人是否全选
      isWhoIndeterminate:true,
      page:{
        pageSize:10, //每页数量
        pageTotal:null, //总数量
        pageIndex:1 //当前页
      },
      tableData: null,
      seeReviews:null, //查看的评论
    }
  },
  mounted(){
    this.getReport();
  },
  methods:{
    /**
     * 获取举报列表
     */
    getReport(){
      this.loading=true;
      const data={
        startTime:this.datePicker.length>0?this.datePicker[0].timeFormat('yyyy-MM-dd'):null,
        endTime:this.datePicker.length>0?this.datePicker[1].timeFormat('yyyy-MM-dd'):null,
        reportAndReviewStatus:this.checkedStatus,
        star:this.checkedStar,
        reportingReason:this.checkedReportReason,
        userWhoReported:this.checkedWho,
        offset:this.page.pageIndex,
        limit:this.page.pageSize,
      }
      this.$apiHttp.siteReportSelect(data).then((resp)=>{
        if(resp.res==200){
          this.tableData=resp.data;
          this.page.pageTotal=resp.data.total;
        }
      }).finally(()=> this.loading=false);
    },
    /**
     * 查看原因
     */
    handleWhy(reviews){
      this.seeReviews=reviews;
      this.$refs.whydialog.openDialog();
    },
    /**
     * 查看评论
     */
    handleSee(reviews){
      this.seeReviews=reviews;
      this.$refs.seedialog.openDialog();
    },
    /**
     * 设置查询每页多少条
     */
    handleSizeChange(val) {
      this.page.pageIndex=1;
      this.page.pageSize = val;
      this.getReport();
    },
    /**
     * 设置当前页多少条
     */
    handleCurrentChange(val) {
      this.page.pageIndex=val;
      this.getReport();
    },
    /**
     * 筛选
     */
    handleApply(type){
      if(type==1){
        this.$refs.star.hide();
      }else if(type==2){
        this.$refs.report.hide();
        console.log(this.checkedReportReason);
      }else if(type==3){
        this.$refs.status.hide()
      }
      else if(type==4){
        this.$refs.whoreport.hide()
      }
      this.getReport();
    },
    /**
     * 举报原因选项
     */
    handleCheckedReportReasonChange(value) {
      let checkedCount = value.length;
      this.checkAllReportReason = checkedCount === this.reportReasonOption.length;
      this.isReportReasonIndeterminate = checkedCount > 0 && checkedCount < this.reportReasonOption.length;
    },
    /**
     * 举报原因全选
     */
    handleReportReasonCheckAllChange(val) {
      this.checkedReportReason = val ? this.reportReasonOption : [];
      this.isReportReasonIndeterminate = false;
    },
    /**
     * star rating全选
     */
    handleStarCheckAllChange(val) {
      this.checkedStar = val ? this.starOption : [];
      this.isStarIndeterminate = false;
    },
    /**
     * 选项
     */
    handleCheckedStarChange(value) {
      let checkedCount = value.length;
      this.checkAllStar = checkedCount === this.starOption.length;
      this.isStarIndeterminate = checkedCount > 0 && checkedCount < this.starOption.length;
    },
    /**
     * Status全选
     */
    handleStatusCheckAllChange(val) {
      this.checkedStatus = val ? this.statusOption : [];
      this.isStatusIndeterminate = false;
    },
    /**
     * Status选项
     */
    handleCheckedStatusChange(value) {
      let checkedCount = value.length;
      this.checkAllStatus = checkedCount === this.statusOption.length;
      this.isStatusIndeterminate = checkedCount > 0 && checkedCount < this.statusOption.length;
    },
    /**
     * who全选
     */
    handleWhoCheckAllChange(val) {
      this.checkedWho = val ? this.whoOption : [];
      this.isWhoIndeterminate = false;
    },
    /**
     * who选项
     */
    handleCheckedWhoChange(value) {
      let checkedCount = value.length;
      this.checkAllWho = checkedCount === this.whoOption.length;
      this.isWhoIndeterminate = checkedCount > 0 && checkedCount < this.whoOption.length;
    },
    attenceCellStyle() {
      return {
        padding: "10px 0",
        fontSize: "14px",
      };
    },
    attenceHeaderStyle() {
      return {
        color: "#222222",
        fontSize: "13px",
      };
    },
  }
}
</script>
<style lang="less" scoped>
.el-dropdown-menu{
  /deep/.el-dropdown-menu__item{
    padding: 3px 15px;
    background: #ffffff;
  }
  .checkbox_dro{
    /deep/.el-checkbox-group{
      display: flex;
      flex-direction: column;
      .el-checkbox{
        display: flex;
        margin: 5px 0;
      }
    }
  }
}
.report{
  .screen{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    box-shadow: 0 2px 2px 0 rgba(0,0,50,0.1);
    .screen_l{
      display: flex;
      flex-direction: row;
      /deep/.el-input{
        width: auto;
        margin-right: 10px;
      }
      /deep/.el-input__inner{
        height: 32px;
        line-height: 32px;
      }
      /deep/.el-input__icon{
        line-height: 32px;
      }
      /deep/.el-button{
        background: #ffffff;
        color: #333333;
        border-color: #E3E3EC;
      }
      .el-dropdown{
        margin-right: 10px;
      }
      .date{
        margin-right: 10px;
        /deep/.el-input__icon{
          line-height: 25px;
        }
        /deep/.el-range-separator{
          line-height: 25px;
        }
      }
    }
  }
  .card_group{
    padding: 20px 18px;
    .card_row{
      margin-top: 20px;
      .card{
        border: 1px solid #DCDCE6;
        border-radius: 3px;
        padding: 10px 14px;
        display: flex;
        align-items: center;
        span{
          color: #6F6F87;
          font-size: 14px;
        }
        span:first-child{
          color: #1B1B21;
          font-size: 40px;
          margin-right: 10px;
        }
      }
      .last_card{
        padding: 20px 14px;
      }
      .tow_card{
        display: flex;
        flex-direction: row;
        .card_item{
          background: #F9FAFB;
          border: 1px solid #DCDCE6;
          border-left: none;
          border-radius: 0 3px 3px 0;
          padding: 10px 14px;
          p{
            margin:0;
            display: flex;
            flex-direction: row;
            align-items: center;
            span{
              color: #6F6F87;
              font-size: 13px;
            }
            span:first-child{
              color: #6F6F87;
              font-size: 28px;
              margin-right: 10px;
            }
          }
        }
        .card{
          border-radius: 3px 0 0 3px;
        }
        div{
          width: 50%;
        }
      }
    }
  }
  .report_group{
    padding: 10px 18px;
    .el-table{
      border: 1px solid #DCDCE6;
      .online{
        width: 12px;
        height: 12px;
        background: #EB1700;
        border-radius: 50%;
        margin: 0 auto;
      }
      .unline{
        width: 12px;
        height: 12px;
        background: #00B67A;
        border-radius: 50%;
        margin: 0 auto;
      }
      .reason{
        margin-bottom: 8px;
      }
      .content{
        line-height: 20px;
      }
      .dialog_text{
        span{
          cursor: pointer;
          color: #409EFF;
        }
      }
    }
  }
  .pagination{
    margin-top: 5px;
  }
}
@media all and (max-width: 1024px){
  .report{
    .screen{
      .screen_l{
        flex-wrap: wrap;
        /deep/.el-input{
          margin-bottom: 8px;
        }
        .el-dropdown{
          margin-bottom: 8px;
          .el-button-group{
            display: flex;
          }
        }
        .date{
          margin-bottom: 8px;
        }
      }
    }
    .card_group{
      padding: 12px 8px;
      .card_row{
        margin-top: 0px;
        .el-col-xs-24{
          margin-top: 10px;
        }
        .card{
          padding: 10px 12px;
          span:first-child{
            font-size: 32px;
          }
        }
        .last_card{
          padding: 10px 12px;
        }
        .tow_card{
          .card_item{
            padding: 10px 12px;
          }
        }
      }
    }
    .report_group{
      padding: 10px 8px;
      .el-table{
        border: 1px solid #DCDCE6;
        .online{
          width: 12px;
          height: 12px;
          background: #EB1700;
          border-radius: 50%;
          margin: 0 auto;
        }
        .unline{
          width: 12px;
          height: 12px;
          background: #00B67A;
          border-radius: 50%;
          margin: 0 auto;
        }
        .reason{
          margin-bottom: 8px;
        }
        .content{
          line-height: 20px;
        }
        .dialog_text{
          span{
            cursor: pointer;
            color: #409EFF;
          }
        }
      }
    }
  }
}
</style>