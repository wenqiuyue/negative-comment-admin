<template>
  <div class="inbox">
    <div class="all_link" v-if="Object.keys(this.query).length">
      <span @click="$router.push('/reviews')">< All reviews</span>
    </div>
    <div class="screen" v-else>
      <div class="screen_l">
        <el-input
          @blur="getReviews"
          placeholder="Search"
          prefix-icon="el-icon-search"
          v-model="searchVal">
        </el-input>
        <el-dropdown split-button size="small" type="primary" trigger="click" :hide-on-click="false" ref="starRate" @command="handleCommand($event,3)">
          Star rating
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">
              <div class="star_rate">
                <i v-if="starCom==1" class="el-icon-check"></i>
                <span>Bad</span>
                <rate
                  class="c_rate"
                  :value="1"
                  :isDisabled="true"
                >
                </rate>
              </div>
            </el-dropdown-item>
            <el-dropdown-item command="2">
              <div class="star_rate">
                <i v-if="starCom==2" class="el-icon-check"></i>
                <span>Poor</span>
                <rate
                  class="c_rate"
                  :value="2"
                  :isDisabled="true"
                >
                </rate>
              </div>
            </el-dropdown-item>
            <el-dropdown-item command="3">
              <div class="star_rate">
                <i v-if="starCom==3" class="el-icon-check"></i>
                <span>Average</span>
                <rate
                  class="c_rate"
                  :value="3"
                  :isDisabled="true"
                >
                </rate>
              </div>
            </el-dropdown-item>
            <el-dropdown-item command="4">
              <div class="star_rate">
                <i v-if="starCom==4" class="el-icon-check"></i>
                <span>Great</span>
                <rate
                  class="c_rate"
                  :value="4"
                  :isDisabled="true"
                >
                </rate>
              </div>
            </el-dropdown-item>
            <el-dropdown-item command="5">
              <div class="star_rate">
                <i v-if="starCom==5" class="el-icon-check"></i>
                <span>Excellent</span>
                <rate
                  class="c_rate"
                  :value="5"
                  :isDisabled="true"
                >
                </rate>
              </div>
            </el-dropdown-item>
            <el-dropdown-item divided class="menu_btn">
              <el-button plain size="mini" @click="handleApply(3)">Apply</el-button>
              <el-button plain size="mini" @click="handleClear(3)">Clear</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown split-button size="small" type="primary" trigger="click" :hide-on-click="false" ref="reply" @command="handleCommand($event,1)">
          Reply
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :icon="replyCom==1?'el-icon-check':''" command="1">Reviews <strong>width a reply</strong></el-dropdown-item>
            <el-dropdown-item :icon="replyCom==2?'el-icon-check':''" command="2">Reviews <strong>without a reply</strong></el-dropdown-item>
            <el-dropdown-item divided class="menu_btn">
              <el-button plain size="mini" @click="handleApply(1)">Apply</el-button>
              <el-button plain size="mini" @click="handleClear(1)">Clear</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown split-button size="small" type="primary" trigger="click" :hide-on-click="false" ref="report" @command="handleCommand($event,2)">
          Report
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :icon="reportCom==1?'el-icon-check':''" command="1">Reviews <strong>reported</strong></el-dropdown-item>
            <el-dropdown-item :icon="reportCom==2?'el-icon-check':''" command="2">Reviews <strong>nor reported</strong></el-dropdown-item>
            <el-dropdown-item divided class="menu_btn">
              <el-button plain size="mini" @click="handleApply(2)">Apply</el-button>
              <el-button plain size="mini" @click="handleClear(2)">Clear</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-date-picker
          class="date"
          @change="getReviews"
          v-model="datePicker"
          type="daterange"
          range-separator="-"
          start-placeholder="Start date"
          end-placeholder="End date">
        </el-date-picker>
      </div>
    </div>
    <div class="review_list" v-loading="loading">
      <template v-if="reviewsList.length>0">
        <div class="review_card" v-for="(item,index) in reviewsList" :key="item.id">
          <div class="card_main">
            <div class="card_main_l">
              <rate
                class="c_rate"
                :value="item.rank"
                :isDisabled="true"
              >
              </rate>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  {{item.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="review_name_dropdown"><a class="user_a" :href="`${site.url}/profile?id=${item.userId}`" target="_blank">{{item.name}} <i class="el-icon-document"></i></a></el-dropdown-item>
                  <el-dropdown-item class="review_name_dropdown" disabled><i class="el-icon-edit"></i> {{item.totalReviews}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="card_main_r">
              <p>
                <span>{{item.subject}}</span>
                <span>{{item.isEdit?'Updated:':''}} {{dateEnglish(item.time)}}</span>
              </p>
              <p>{{item.content}}</p>
              <p>Source: Organic</p>
            </div>
          </div>
          <div class="card_btn_group">
            <el-tabs v-model="activeCardName" @tab-click="handleCardNameClick">
              <el-tab-pane label="Reply" :name="JSON.stringify({name:'reply',item:item})">
                <div slot="label" class="tab_label" v-if="item.replys.length>0"><i class="el-icon-success"></i> <span>Replied</span></div>
                <div slot="label" class="tab_label" v-else><svg-icon value="icon-huifu" :size="1.5"></svg-icon> <span>Reply</span></div>
                <div class="reply_tab">
                  <div class="reply_tab_l">
                    {{item.companyName}}
                  </div>
                  <div class="reply_tab_r">
                    <div v-if="item.replys.length==0 || replyEditId">
                      <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="Please input"
                        v-model="replyTextarea">
                      </el-input>
                      <el-button type="primary" size="small" plain @click="handleReply(item.id)" :loading="confrimBtnLoading"><i class="el-icon-edit el-icon--right"></i> Post reply</el-button>
                      <el-button size="small" plain @click="handleCancle">Cancel</el-button>
                    </div>
                    <template v-else>
                      <div class="reply_content" v-for="(repitem,index) in item.replys" :key="repitem.id">
                        <p>{{repitem.content}}</p>
                        <div class="date">{{repitem.isEdit?'Updated:':''}} {{dateEnglish(repitem.time)}}</div>
                        <el-button type="primary" size="small" plain @click="handleEditReply(repitem)"><i class="el-icon-edit el-icon--right"></i> Edit reply</el-button>
                        <el-popconfirm
                          confirm-button-text='confirm'
                          cancel-button-text='cancle'
                          @confirm="handleDel(repitem.id)"
                          icon="el-icon-info"
                          icon-color="red"
                          title="Are you sure to delete？"
                        >
                          <el-button slot="reference" type="danger" size="small" plain><i class="el-icon-delete el-icon--right"></i> Delete reply</el-button>
                        </el-popconfirm>
                      </div>
                    </template>
                  </div>
                </div>
              </el-tab-pane>
              <!-- <el-tab-pane label="Share" :name="JSON.stringify({name:'share',item:item})">
                <div slot="label" class="tab_label"><svg-icon value="icon-fenxiang1" :size="1.1"></svg-icon> <span>Share</span></div>
                12
              </el-tab-pane> -->
              <el-tab-pane label="Find Reviewer" :name="JSON.stringify({name:'find',item:item})">
                <div slot="label" class="tab_label"><svg-icon value="icon-chazhao" :size="1.4"></svg-icon> <span>Find Reviewer</span> <el-tag size="mini" v-if="item.findReviewers.length">{{item.findReviewers.length}}</el-tag></div>
                <template v-if="item.findReviewers.length">
                  <div class="find_tab" v-for="(fitem,index) in item.findReviewers" :key="index">
                    <div class="find" v-if="fitem.status==1">
                      <div class="find_tab_l">
                        {{fitem.created.timeFormat('yyyy-MM-dd HH:mm')}}
                      </div>
                      <div class="find_tab_r">
                        <div class="find_content">
                          <p>You asked {{item.name}} for more information.</p>
                        </div>
                      </div>
                    </div>
                    <div class="find" v-if="fitem.status==1 && fitem.consumer">
                      <div class="find_tab_l">
                        {{fitem.consumer.submittedAt.timeFormat('yyyy-MM-dd HH:mm')}}
                      </div>
                      <div class="find_tab_r">
                        <div class="find_border">
                            <p class="first_p">{{item.name}} responded to your request:</p>
                            <div>
                              <p>Reference number:{{fitem.consumer.referenceNumber}}</p>
                              <p>Email:{{fitem.consumer.email}}</p>
                              <p>Name:{{fitem.consumer.fullName}}</p>
                              <p>Phone:{{fitem.consumer.phoneNumber}}</p>
                            </div>
                          </div>
                      </div>
                    </div>
                    <div class="find" v-if="fitem.status==0 || fitem.status==2">
                      <div class="find_tab_l">
                        {{fitem.created.timeFormat('yyyy-MM-dd HH:mm')}}
                      </div>
                      <div class="find_tab_r">
                        <div class="find_border" v-if="fitem.status==2">
                          <p>Unfortunately, {{item.name}} did not respond to your Find Reviewer request within the 3 day response period.</p>  
                        </div>
                        <div class="find_border" v-if="fitem.status==0">
                          <p>They have until {{getThreeDayTime(fitem.created)}} to respond. We'll email you with the outcome no matter what.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </el-tab-pane>
              <el-tab-pane label="Report" :name="JSON.stringify({name:'report',item:item})">
                <div slot="label" class="tab_label">
                  <svg-icon value="icon-biaoji" :size="1.1" ></svg-icon> 
                  <span v-if="!item.investigations.length">Report</span>
                  <span v-else-if="item.reportSta==0">Invistigation in progress</span>
                  <span v-else>Invistigation complete</span>
                </div>
                <div class="report_tab" v-if="item.investigations.length">
                  <el-timeline v-if="!isDown">
                    <el-timeline-item :timestamp="report.time.timeFormat('yyyy-MM-dd HH:mm')" placement="top" v-for="(report,index) in item.investigations" :key="index">
                      <el-card>
                        <div class="report_card_main">
                          <span class="r_c_m_l">{{report.state==0?'Invistigation in progress:':'Invistigation complete:'}}</span> 
                          <div class="r_c_m_r">
                            <p class="p_one" v-if="report.state==2 || report.state==1">
                              The review {{report.state==2?"doesn't":""}} breach our guidelines for:
                            </p>
                            <p><strong>{{report.reportingReason}}</strong></p>
                            <p>{{report.content}}</p>
                          </div>
                        </div>
                        <p v-if="report.state==2 || report.state==1">
                          <el-button plain icon="el-icon-reading" @click="handleRead(item,report)">Read our decision</el-button>
                          <el-button type="text" class="dif_issue" @click="handleDifferent(item.id)">There's a different issue</el-button>
                        </p>
                      </el-card>
                    </el-timeline-item>
                  </el-timeline>
                  <el-timeline v-else>
                    <el-timeline-item :timestamp="item.investigations[0].time.timeFormat('yyyy-MM-dd HH:mm')" placement="top" :key="index">
                      <el-card>
                        <div class="report_card_main">
                          <span class="r_c_m_l">{{item.investigations[0].state==0?'Invistigation in progress:':'Invistigation complete:'}}</span> 
                          <div class="r_c_m_r">
                            <p v-if="item.investigations[0].state==1 || item.investigations[0].state==2" class="p_one">
                              The review {{item.investigations[0].state==2?"doesn't":""}} breach our guidelines for:
                            </p>
                            <p><strong>{{item.investigations[0].reportingReason}}</strong></p>
                            <p>{{item.investigations[0].content}}</p>
                          </div>
                        </div>
                        <p v-if="item.investigations[0].state==1 || item.investigations[0].state==2">
                          <el-button plain icon="el-icon-reading" @click="handleRead(item,item.investigations[0])">Read our decision</el-button>
                          <el-button type="text" class="dif_issue" @click="handleDifferent(item.id)">There's a different issue</el-button>
                        </p>
                      </el-card>
                    </el-timeline-item>
                  </el-timeline>
                  <div class="show_btn" v-if="item.investigations.length>1">
                    <el-button type="text" :icon="!isDown?'el-icon-caret-top':'el-icon-caret-bottom'" @click="isDown=!isDown">{{isDown?'Show history':'Hide history'}}</el-button>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
            <!-- <div class="report">
              <svg-icon value="icon-biaoji" :size="1.3" :color="'#9A9AAD'" @click="handleReport"></svg-icon>
              <span v-if="index==2">Invistigation in progress</span>
              <span v-else-if="index==1">Invistigation complete</span>
            </div> -->
          </div>
        </div>
      </template>
      <empty v-else :tips="'No data available'"></empty>
    </div>
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
    <ReportDialog ref="reportdialog" :comId="selCommonId" @success="getReviews" :selOption="reportReasonOption"></ReportDialog>
    <FindDialog ref="finddialog" :selReviews="selReviews" @success="getReviews"></FindDialog>
    <ReadDialog ref="readdialog" :selReport="selReviews"></ReadDialog>
  </div>
</template>
<script>
import { dateEnglish } from '../../commons';
export default {
  components:{
    ReportDialog:()=> import("./report-dialog"),
    FindDialog:()=> import("./find-dialog"),
    ReadDialog:()=> import("./read-dialog")
  },
  props:{
    reportReasonOption:{
      type:Array,
      default:[]
    },
  },
  data(){
    return{
      searchVal:null, //搜索
      datePicker:[], //评论时间筛选
      activeCardName:null, //评论卡片操作选项卡
      replyTextarea:'', //商家回复
      isDown:true, //向下
      loading:false,
      starCom:null, //星星筛选条件
      replyCom:null, //回复筛选条件
      reportCom:null, //举报筛选条件
      reviewsList:[], //评论列表
      confrimBtnLoading:false,
      page:{
        pageSize:10, //每页数量
        pageTotal:null, //总数量
        pageIndex:1 //当前页
      },
      user: null, //商家信息
      replyEditId:null, //回复的id
      selCommonId:null, //选择的评论id
      selReviews:null, //选择的评论
      reviewId:null //评论id
    }
  },
  computed:{
    query(){
      return this.$route.query;
    },
    site(){
      return this.$store.state.siteInfo;
    }
  },
  watch:{
    query(){
      if(Object.keys(this.query).length){
      //查询单条评论
        if(this.query.review_id){
          this.reviewId=this.query.review_id;
        }else{
          this.reviewId=null;
        }
      }else{
        this.reviewId=null;
      }
      this.page.pageIndex=1;
      this.reviewsList=[];
      this.getReviews();   
    }
  },
  mounted(){
    if(Object.keys(this.query).length){
      //查询单条评论
      if(this.query.review_id){
        this.reviewId=this.query.review_id;
      }
    }
    this.getReviews();
  },
  methods:{
    dateEnglish,
    /**
     * 获取3天后的时间
     */
    getThreeDayTime(time){
      let date = new Date(time);
      date.setDate(date.getDate()+3);
      return `${this.dateEnglish(date)} at ${date.timeFormat('HH:mm')}`;
    },
    /**
     * 阅读举报
     */
    handleRead(item,report){
      this.selReviews=null;
      this.selReviews=report;
      this.selReviews.companyName=item.companyName;
      this.selReviews.name=item.name;
      this.$refs.readdialog.openDialog();
    },
    /**
     * 删除评论
     */
    handleDel(id){
      this.$apiHttp.siteDelReply({params:{id:id}}).then((resp)=>{
        if(resp.res==200){
          this.$message({
            message: 'Successfully deleted',
            type: 'success'
          });
          this.getReviews();
        }
      })
    },
    /**
     * 评论cancle
     */
    handleCancle(){
      this.replyTextarea=null;
      this.activeCardName=null;
      this.replyEditId=null;
    },
    /**
     * 点击修改按钮
     */
    handleEditReply(reply){
      this.replyEditId = reply.id;
      this.replyTextarea = reply.content;
    },
    /**
     * 商家回复/修改
     */
    handleReply(comId){
      this.confrimBtnLoading=true;
      const data={
        content:this.replyTextarea,
        commentId:comId,
        id:this.replyEditId,
      }
      this.$apiHttp.siteReply(data).then((resp)=>{
        if(resp.res==200){
          this.replyTextarea=null;
          this.replyEditId=null;
          this.$message({
            message: this.replyEditId?'Modification reply succeeded':'Reply succeeded',
            type: 'success'
          });
          this.getReviews();
        }
      }).finally(()=> this.confrimBtnLoading=false);
    },
    /**
     * 筛选条件选择切换
     */
    handleCommand(com,type){
      if(!com){
        return;
      }
      if(type==3){
        this.starCom = com;
      }else if(type==1){
        this.replyCom = com;
      }else if(type==2){
        this.reportCom = com;
      }
    },
    /**
     * 获取评论数据
     */
    getReviews(){
      this.loading=true;
      const data={
        ids:this.reviewId,
        search: this.searchVal,
        star:this.starCom,
        reply:this.replyCom,
        report:this.reportCom,
        startTime:this.datePicker.length>0?this.datePicker[0].timeFormat('yyyy-MM-dd'):null,
        endTime:this.datePicker.length>0?this.datePicker[1].timeFormat('yyyy-MM-dd'):null,
        offset:this.page.pageIndex,
        limit:this.page.pageSize,
      }
      this.$apiHttp.siteReviews({params:data}).then((resp)=>{
        if(resp.res==200){
          this.reviewsList=resp.data.reviews;
          this.reviewsList.forEach((m)=>{
            m.reportSta=null;
            if(m.investigations.length>0){
              m.investigations.forEach((i)=>{
                if(i.state==0){
                  m.reportSta=0;
                }else if(i.state==1){
                  m.reportSta=1;
                }
              })
            }
          })
          //当查询单条评论，根据type，默认展开第一条评论选项卡
          if(Object.keys(this.query).length && this.reviewsList.length){
            this.$bus.$emit("newMsg");
            //查询单条评论
            if(this.query.type=='reply'){
              this.activeCardName=JSON.stringify({name:'reply',item:this.reviewsList[0]})
            }else if(this.query.type=='find'){
              this.activeCardName=JSON.stringify({name:'find',item:this.reviewsList[0]})
            }else if(this.query.type=='report'){
              this.activeCardName=JSON.stringify({name:'report',item:this.reviewsList[0]})
            }
          }
          this.page.pageTotal=resp.data.total;
        }
      }).finally(()=> this.loading=false);
    },
    /**
     * 举报不同的问题
     */
    handleDifferent(id){
      this.selCommonId=id;
      this.$refs.reportdialog.openDialog();  
    },
    /**
     * 评论状态切换
     */
    handleCardNameClick(tab, event){
      const tabData = JSON.parse(tab.name);
      // if(tabData.name=='find'){
      //   this.selReviews=null;
      //   this.selReviews=tabData.item;
      //   this.$refs.finddialog.openDialog();
      // }
      if(tabData.name=='report' && tabData.item.investigations.length==0){
        this.selCommonId=tabData.item.id;
        this.$refs.reportdialog.openDialog();  
      }else if(tabData.name=='find' && tabData.item.findReviewers.length==0){
        this.selReviews=null;
        this.selReviews=tabData.item;
        this.$refs.finddialog.openDialog();
      }
    },
    /**
     * 举报
     */
    handleReport(){
      this.$refs.reportdialog.openDialog();
    },
    /**
     * 筛选
     */
    handleApply(type){
      if(type==1){
        this.$refs.reply.hide();
      }else if(type==2){
        this.$refs.report.hide();
      }else if(type==3){
        this.$refs.starRate.hide()
      }
      this.getReviews();
    },
    /**
     * 清除筛选
     */
    handleClear(type){
      if(type==1){
        this.replyCom = null;
        this.$refs.reply.hide();
      }else if(type==2){
        this.reportCom = null;
        this.$refs.report.hide();
      }else if(type==3){
        this.starCom = null;
        this.$refs.starRate.hide()
      }
      this.getReviews();
    },
    handleSizeChange(val) {
      this.page.pageIndex=1;
      this.page.pageSize = val;
      this.getReviews();
    },
    handleCurrentChange(val) {
      this.page.pageIndex=val;
      this.getReviews();
    }
  }
}
</script>
<style lang="less" scoped>
.user_a{
  text-decoration: none;
  color: #606266;
}
.el-dropdown-menu{
  /deep/.review_name_dropdown{
    padding: 0 15px !important;
  }
  /deep/.review_name_dropdown:first-child{
    font-weight: bold;
    font-size: 16px;
  }
  /deep/.el-dropdown-menu__item{
    padding: 3px 15px;
    // background: #ffffff;
  }
  /deep/.menu_btn{
    background: #ffffff;
  }
  .star_rate{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    span{
      margin-right: 22px;
    }
    .el-rate{
      height: auto;
      /deep/.el-rate__icon{
        font-size: 20px;
        margin-right: 3px;
      }
    }
  }
}
.inbox{
  .all_link{
    background: #f5f9fc;
    border-bottom: 1px solid #eaedf3;
    padding: 16px 32px;
    span{
      color: #454554;
      cursor: pointer;
      font-size: 15px;
    }
  }
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
      /deep/.el-dropdown{
        margin-right: 10px;
        .el-button-group{
          display: flex;
        }
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
  .review_list{
    max-width: 980px;
    margin: 15px auto;
    height: 100%;
    .review_card{
      margin-bottom: 8px;
      background: #ffffff;
      border: 1px solid #DCDCE6;
      border-radius: 3px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
      .card_main{
        padding: 18px 15px;
        border-bottom: 1px solid #DCDCE6;
        display: flex;
        flex-direction: row;
        .card_main_l{
          width: 185px;
          .c_rate{
            margin-bottom: 12px;
            /deep/.icon-pingfendengjiRating4{
              font-size: 26px;
              margin-right: 3px;
            }
          }
          .el-dropdown-link{
            color: #6F6F87;
          }
        }
        .card_main_r{
          flex: 1;
          p:nth-child(1){
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-top: 0;
            span:nth-child(1){
              font-weight: bold;
              color: #1B1B21;
              width: 50%;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
            }
            span:nth-child(2){
              font-size: 14px;
              color: #6F6F87;
            }
          }
          p:nth-child(2){
            font-size: 14px;
            color: #454554;
            word-break: break-all;
            line-height: 23px;
          }
          p:nth-child(3){
            font-size: 13px;
            color: #6F6F87;
            word-break: break-all;
            line-height: 23px;
          }
        }
      }
      .card_btn_group{
        position: relative;
        .el-tabs{
          /deep/.el-tabs__nav-wrap{
            padding-left:190px;
          }
          .tab_label{
            display: flex;
            align-items: center;
            span{
              margin-left: 5px;
            }
          }
          /deep/.el-tabs__nav{
            display: flex;
            align-items: center;
          }
          /deep/.el-tabs__nav-scroll{
            float: right;
          }
          .reply_tab{
            padding: 18px 15px;
            background: #F9F9FA;
            display: flex;
            flex-direction: row;
            .reply_tab_l{
              width: 185px;
              text-align: left;
              font-size: 14px;
              color: #6F6F87;
            }
            .reply_tab_r{
              flex: 1;
              .el-button{
                margin-top: 10px;
              }
              .reply_content{
                p{
                  font-size: 14px;
                  margin-top: 0;
                  line-height: 23px;
                  word-break: break-all;
                  color: #454554;
                }
                .date{
                  // text-align: right;
                  font-size: 13px;
                  color: #6F6F87;
                }
                .el-button{
                  margin-right: 8px;
                }
              }
            }
          }
          .find_tab{
            padding: 18px 15px;
            background: #F9F9FA;
            .find{
              display: flex;
              flex-direction: row;
              .find_tab_l{
                width: 185px;
                text-align: left;
                font-size: 12px;
                color: #6F6F87;
              }
              .find_tab_r{
                flex: 1;
                .find_content{
                  p{
                    font-size: 14px;
                    margin-top: 0;
                    line-height: 23px;
                    word-break: break-all;
                    color: #454554;
                  }
                }
                .find_border{
                  padding: 16px;
                  border: 1px solid #DCDCE6;
                  border-radius: 4px;
                  background: #ffffff;
                  p{
                    margin: 0;
                    font-size: 14px;
                    color: #454554;
                  }
                  .first_p{
                    margin-bottom: 8px;
                  }
                }
              }
            }
          }
          .report_tab{
            padding: 18px 15px;
            background: #F9F9FA;
            .dif_issue{
              color: #454554;
            }
            /deep/.el-timeline-item__node{
              background-color: #409EFF;
            }
            /deep/.el-timeline-item__tail{
              border-left: 2px solid #C5C5D6;
            }
            .show_btn{
              padding-left: 30px;
            }
            .report_card_main{
              display: flex;
              flex-direction: row;
              .r_c_m_l{
                flex-shrink: 0;
              }
              .r_c_m_r{
                margin-left: 8px;
                p{
                  margin: 0 0 5px;
                }
                .p_one{
                  margin-bottom: 10px !important;
                }
              }
            }
          }
        }
      }
    }
    /deep/.el-loading-mask{
      .el-loading-spinner{
        position: fixed;
        max-width: 980px;
      }
    }
  }
  .pagination{
    background: #ffffff;
    padding-bottom: 10px;
    max-width: 980px;
    margin: 5px auto;
  }
}
@media all and (max-width: 1024px) {
  .inbox{
    .screen{
      .screen_l{
        flex-wrap: wrap;
        /deep/.el-input{
          margin-bottom: 8px;
        }
        .el-dropdown{
          margin-bottom: 8px;
        }
        .date{
          margin-bottom: 8px;
        }
      }
    }
    .review_list{
      padding: 0 3px;
      .review_card{
        .card_main{
          flex-direction: column;
          padding: 18px 13px;
          .card_main_l{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .c_rate{
              /deep/.icon-pingfendengjiRating4{
                font-size: 22px;
              }
            }
          }
          .card_main_r{
            flex: 1;
            p:nth-child(1){
              display: flex;
              flex-direction: column;
              margin-top: 0;
              span:nth-child(1){
                width: 100%;
                margin-bottom: 3px;
              }
            }
          }
        }
        .card_btn_group{
          position: relative;
          .el-tabs{
            /deep/.el-tabs__nav-wrap{
              padding:0px 18px;
              overflow-x: scroll;
            }
            /deep/.el-tabs__nav{
              display: flex;
              align-items: center;
            }
            /deep/.el-tabs__nav-scroll{
              float: left;
            }
            .reply_tab{
              flex-direction: column;
              .reply_tab_l{
                width: 100%;
                margin-bottom: 5px;
              }
            }
            .find_tab{
              .find{
                display: flex;
                flex-direction: column;
                .find_tab_l{
                  width: 100%;
                }
              }
            }
            .report_tab{
              padding: 18px 15px;
              background: #F9F9FA;
              /deep/.el-timeline{
                padding: 0;
              }
              .show_btn{
                padding-left: 0px;
              }
              .report_card_main{
                display: flex;
                flex-direction: column;
                .r_c_m_r{
                  margin-left: 0px;
                  p{
                    margin: 0 0 5px;
                  }
                  .p_one{
                    margin-bottom: 10px !important;
                  }
                }
              }
            }
          }
        }
      }
    }
    .pagination{
      padding-bottom: 24px;
      overflow-x: scroll;
    }
  }
}
</style>