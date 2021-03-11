<template>
  <div class="home" v-loading="loading">
    <div class="date">
       <el-date-picker
        @change="datePickerChange"
        v-model="datePicker"
        type="monthrange"
        range-separator="-"
        start-placeholder="Start month"
        end-placeholder="End month">
      </el-date-picker>
    </div>
    <div class="home_main" v-if="comData">
      <el-row :gutter="8" class="row">
        <el-col :span="12" :xs="24">
          <div class="card">
            <div class="card_title">
              <div class="card_title_left">
                <span>Overall performance</span>
                <el-tooltip class="item" effect="dark"  placement="top">
                  <div slot="content" style="width:210px;word-break:break-all">Get an overview of your customer satisfaction. Your rating and score are current and not based on the selected time frame. The information is also displayed on your public Trustpilot profile page.</div>
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </div>
            </div>
            <div class="card_score">
              <h5>Great</h5>
              <rate
                class="c_rate"
                :value="comData.overallPerformance.trustscore"
                :isDisabled="true"
              >
              </rate>
              <div class="reviews_num">Based on <strong>{{comData.overallPerformance.total}}</strong> reviews</div>
            </div>
            <div class="trust_score">
              <div>TRUSTSCORE</div>
              <div><strong>{{comData.overallPerformance.trustscore}}</strong> out of 5</div>
            </div>
          </div>
        </el-col>
        <el-col :span="12" :xs="24">
          <div class="card">
            <div class="card_title">
              <div class="card_title_left">
                <span>Engage</span>
                <el-tooltip class="item" effect="dark"  placement="top">
                  <div slot="content" style="width:210px;word-break:break-all">See snippets of your recent reviews regardless of the selected time frame. You can click through to read the full reviews, reply, share, and showcase your great customer service.</div>
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </div>
              <div class="card_title_right" @click="$router.push('/reviews')">
                Service Reviews
              </div>
            </div>
            <p class="eng_reviews">Your {{comData.engage.length}} latest reviews</p>
            <div class="reviews_list">
              <div class="reviews_item" v-for="(item,index) in comData.engage" :key="index" @click="handleSeeReview(item.id)">
                <span class="reviews_item_l">"</span>
                <div class="reviews_item_r">
                  <div>{{item.content}}</div>
                  <div>
                    <rate
                      class="c_rate"
                      :value="item.rank"
                      :isDisabled="true"
                    >
                    </rate>
                    <span>By {{item.name}}, {{formatDate(item.time)}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="24" >
          <div class="card">
            <div class="card_title">
              <div class="card_title_left">
                <span>Your reviews</span>
                <el-tooltip class="item" effect="dark" placement="top">
                  <div slot="content" style="width:210px;word-break:break-all">Keep track of your reviews alongside your star distribution. Trustpilot verifies that a review is genuine if we can connect it to an invitation sent through Trustpilot Business.</div>
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </div>
            </div>
            <div class="reviews">
              <div class="reviews_l" v-if="false">
                <p>No reviews to show for this time frame.</p>
                <p>Try broadening your search</p>
              </div>
              <div class="reviews_l_card_list" v-else>
                <div class="reviews_l_card">
                  <div class="r_l_c_title">TOTAL REVIEWS</div>
                  <h5>{{comData.yourReviews.totalReviews.total}}</h5>
                  <i class="el-icon-caret-bottom"></i> <span class="dropdown_txt">{{comData.yourReviews.totalReviews.compare}}</span>
                  <!-- <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      <i class="el-icon-caret-bottom"></i> <span class="dropdown_txt">{{comData.yourReviews.totalReviews.compare}}</span>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>黄金糕</el-dropdown-item>
                      <el-dropdown-item>狮子头</el-dropdown-item>
                      <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown> -->
                </div>
                <div class="reviews_l_card">
                  <div class="r_l_c_title">YOUR REPLY RATE</div>
                  <h5>{{comData.yourReviews.yourReplyRate}}</h5>
                </div>
              </div>
              <div class="reviews_r">
                <p>STAR DISTRIBUTION</p>
                <div class="reviews_star_list">
                  <div v-for="(item,index) in comData.barDistributton" :key="index">
                    <div class="star_item" v-if="item.star==5">
                      <span>5 stars</span>
                      <el-progress :text-inside="true" :stroke-width="26" :percentage="item.ratio" color="#00B67A"></el-progress>
                      <span>{{item.amount}} Reviews</span>
                    </div>
                    <div class="star_item" v-else-if="item.star==4">
                      <span>4 stars</span>
                      <el-progress :text-inside="true" :stroke-width="26" :percentage="item.ratio" color="#73CF11"></el-progress>
                      <span>{{item.amount}} Reviews</span>
                    </div>
                    <div class="star_item" v-else-if="item.star==3">
                      <span>3 stars</span>
                      <el-progress :text-inside="true" :stroke-width="26" :percentage="item.ratio" color="#FFCE00"></el-progress>
                      <span>{{item.amount}} Reviews</span>
                    </div>
                    <div class="star_item" v-else-if="item.star==2">
                      <span>2 stars</span>
                      <el-progress :text-inside="true" :stroke-width="26" :percentage="item.ratio" color="#FF8622"></el-progress>
                      <span>{{item.amount}} Reviews</span>
                    </div>
                    <div class="star_item" v-else-if="item.star==1">
                      <span>1 stars</span>
                      <el-progress :text-inside="true" :stroke-width="26" :percentage="20" color="#FF3722"></el-progress>
                      <span>{{item.amount}} Reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <empty v-else :tips="'No data available'"></empty>
  </div>
</template>
<script>
import { formatDate } from '../../commons';
import empty from '../../components/empty.vue';
export default {
  components: { empty },
  data(){
    return{
      datePicker:[], //时间筛选
      comData:null, //首页数据
      loading:false
    }
  },
  mounted(){
    this.getData();
  },
  methods:{
    formatDate,
    /**
     * 查看某条评论
     */
    handleSeeReview(rid){
      this.$router.push({
        path:"/reviews",
        query:{
          review_id:rid,
          type:'reply'
        }
      })
    },
    /**
     * 时间选择触发
     */
    datePickerChange(){
      this.getData();
    },
    /**
     * 获取数据
     */
    getData(){
      this.loading=true;
      const data={
        startTime:this.datePicker[0]?this.datePicker[0].timeFormat('yyyy-MM'):null,
        endTime:this.datePicker[1]?this.datePicker[1].timeFormat('yyyy-MM'):null
      }
      this.$apiHttp.siteComment({params:data}).then((resp)=>{
        this.comData = resp.data;
      }).finally(()=> this.loading=false);
    }
  }
}
</script>
<style lang="less" scoped>
.home{
  padding:10px;
  background: #F9F9F9;
  height: calc(100% - 20px);
  overflow-y: scroll;
  .date{
    text-align: right;
  }
  .home_main{
    height: 100%;
  }
  .row{
    display: -webkit-box;
    margin-top: 10px;
    .el-col{
      // height: 100%;
      .card{
        background: #ffffff;
        border: 1px solid #e4ebf3;
        border-radius: 3px;
        height: 100%;
        padding: 0 20px 0 26px;
        .card_title{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 26px 0;
          .card_title_left{
            span{
              color: #454554;
              margin-right: 5px;
            }
            .el-icon-info{
              color: #C5C5D6;
            }
          }
          .card_title_right{
            color: #C5C5D6;
            font-size: 14px;
            cursor: pointer;
            &:hover{
              color: #409eff;
            }
          }
        }
        .card_score{
          h5{
            font-weight:normal;
            font-size: 22px;
            color: #454554;
            margin: 10px 0;
          }
          .c_rate{
            height: 38px;
            /deep/.icon-pingfendengjiRating4{
              font-size: 34px;
            }
          }
          .reviews_num{
            font-size: 13px;
            color: #6F6F87;
          }
        }
        .trust_score{
          border: 1px solid #DCDCE6;
          margin-top: 27px;
          padding: 23px 17px 21px;
          border-radius: 5px;
          div:first-child{
            font-size: 14px;
            color: #6F6F87;
          }
          div:last-child{
            color: #454554;
            font-size: 18px;
            margin-top: 5px;
          }
        }
        .eng_reviews{
          margin: 0;
          font-size: 13px;
          color: #6F6F87;
        }
        .reviews_list{
          margin-top: 10px;
          .reviews_item{
            display: flex;
            flex-direction: row;
            padding: 8px 0;
            cursor: pointer;
            &:hover{
              background: #F2F2F5;
            }
            .reviews_item_l{
              flex-shrink: 0;
              font-size: 33px;
            }
            .reviews_item_r{
              padding-top: 9px;
              margin-left: 3px;
              div:first-child{
                font-size: 14px;
                color: #454554;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
              }
              div:last-child{
                margin-top: 5px;
                display: flex;
                flex-direction: row;
                align-items: center;
                span{
                  font-size: 13px;
                  color: #9A9AB5;
                  margin-left: 5px;
                }
                .c_rate{
                  line-height: 20px;
                  /deep/.el-rate__icon{
                    margin-right: 3px;
                  }
                }
              }
            }
          }
          .reviews_item:last-child{
            margin-bottom: 8px;
          }
        }
        .reviews{
          display: flex;
          flex-direction: row;
          padding-bottom: 10px;
          // align-items: center;
          .reviews_l{
            width: 50%;
            p:first-child{
              color: #454554;
            }
            p:last-child{
              font-size: 14px;
              color: #6F6F87;
            }
          }
          .reviews_l_card_list{
            padding-right: 20px;
            width: 50%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            .reviews_l_card{
              width: 180px;
              height: calc(50% - 35px);
              border: 1px solid #DCDCE6;
              padding: 15px;
              margin-right: 20px;
              margin-bottom: 10px;
              .r_l_c_title{
                font-size: 14px;
                color: #6F6F87;
              }
              .el-dropdown{
                  /deep/.dropdown_txt{
                    font-size: 12px;
                  }
                }
              h5{
                margin: 10px 0 0px 0;
                font-size: 18px;
                color: #454554;
                font-weight: normal;
              }
            }
          }
          .reviews_r{
            width:50%;
            p{
              font-size: 14px;
              color: #6F6F87;
              margin: 0 0 20px;
            }
            .reviews_star_list{
              width: 100%;
              .star_item{
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-bottom: 12px;
                .el-progress{
                  width: 70%;
                  margin: 0 8px;
                }
                span{
                  font-size: 14px;
                  color: #6F6F87;
                }
              }
            }
          }
        }
      }
    }
  }
  .row:last-child{
    margin-top: 10px;
  }
}
@media all and (max-width: 1024px) {
  .home{
  height: 100%;
  .row{
    display: flex;
    flex-direction: column;
    margin-top: 0px;
    .el-col{
      margin-top: 10px;
      .card{
        padding: 0 20px 14px 26px;
        .reviews{
          display: flex;
          flex-direction: column;
          // align-items: center;
          .reviews_l{
            width: 100%;
          }
          .reviews_l_card_list{
            padding-right: 20px;
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            .reviews_l_card{
              width: 37%;
              height: calc(50% - 35px);
              padding: 15px;
              margin-right: 5px;
              margin-bottom: 30px;
            }
          }
          .reviews_r{
            width:100%;
            .reviews_star_list{
              width: 100%;
              .star_item{
                .el-progress{
                  width: 59%;
                }
                span{
                  font-size: 13px;
                  flex-shrink: 0;
                }
              }
            }
          }
        }
      }
    }
  }
  .row:last-child{
    margin-top: 0px;
    padding-bottom: 10px;
  }
}
}
</style>