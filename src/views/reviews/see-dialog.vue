<template>
  <div class="see-dialog" v-if="seeReviews">
    <el-dialog title="Review" :visible.sync="dialogSee" width="615px">
      <div class="see_main">
        <el-row>
          <el-col :span="8" :xs="24">
            <div class="col_l">
              <rate
                class="c_rate"
                :value="seeReviews.reviews.rank"
                :isDisabled="true"
              >
              </rate>
              <p class="name">{{seeReviews.reviews.name}}</p>
              <div class="review_date">
                Reinstated on<br>
                {{seeReviews.reviews.time.timeFormat('yyyy-MM-dd')}}
              </div>
            </div>
          </el-col>
          <el-col :span="16" :xs="24">
            <div class="col_r">
              <h5>{{seeReviews.reviews.subject}}</h5>
              <p>{{seeReviews.reviews.content}}</p>
              <!-- <p>UPDATE: WhiteHatBox attempted to have my review taken down or edited from the site. They claimed my review broke the terms of service for Trust Pilot because it “promoted” other products. This is a cheap and slimy move that casts them in an even shadier light. Don't trust them!</p> -->
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeBtn">Close</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props:{
    seeReviews:{
      type:Object,
      default:null
    }
  },
  data(){
    return{
      dialogSee:false,
    }
  },
  methods:{
    /**
     * 打开弹窗
     */
    openDialog(){
      this.dialogSee=true;
    },
    /**
     * 确认按钮
     */
    closeBtn(){
      this.dialogSee = false
    },
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/dialog.less";
.see-dialog{
  .see_main{
    .col_l{
      .c_rate{
        /deep/.icon-pingfendengjiRating4{
          font-size: 26px;
          margin-right: 3px;
        }
      }
      .name{
        margin: 14px 0 8px;
        color: #454554;
      }
      .review_date{
        color: #6f6f87;
        font-size: 12px;
        line-height: 16px;
      }
    }
    .col_r{
      h5{
        color: #1b1b21;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        margin: 0 0 4px;
      }
    }
  }
  /deep/.el-dialog__header{
    padding: 18px 20px;
  }
  /deep/.el-dialog__body{
    border-top: 1px solid #E4E4EC;
    padding:22px;
    min-height: 180px;
  }
  /deep/.el-dialog__footer{
    border-top: 1px solid #E4E4EC;
    background: #F9F9FA;
    padding: 15px 20px;
    .dialog-footer{
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>