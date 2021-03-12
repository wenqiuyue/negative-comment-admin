<template>
  <el-container class="container">
    <el-aside class="aside" :style="`width:${isCollapse ? 54 : 200}px`" v-if="!isMobile()">
      <div class="logo" :style="`width:${isCollapse ? 54 : 200}px`">
        <el-image
          :class="isCollapse ? 'collapse_img' : 'collapse_n_img'"
          :src="require('../../assets/img/logo.png')"
          fit="scale-down"
        >
        </el-image>
      </div>
      <el-menu
        background-color="#304156"
        text-color="#bfcbd9"
        :default-active="path"
        :collapse="isCollapse"
        unique-opened
        router
      >
        <el-menu-item index="/Verification" class="menu_item" v-if="path=='/Verification'">
          <svg-icon value="icon-linkman-contacts_ico" :size="1.1"></svg-icon>
          <span slot="title">Profile verification</span>
        </el-menu-item>
        <div v-else>
          <el-menu-item index="/home" class="menu_item">
            <svg-icon value="icon-shouye1" :size="1.1"></svg-icon>
            <span slot="title">Home</span>
          </el-menu-item>
          <el-menu-item index="/analystics" class="menu_item">
            <svg-icon value="icon-shuju1" :size="1.1"></svg-icon>
            <span slot="title">Analystics</span>
          </el-menu-item>
          <el-menu-item index="/reviews" class="menu_item">
            <svg-icon
              value="icon-pinglun"
              :size="1.2"
            ></svg-icon>
            <span slot="title">Complaints</span>
          </el-menu-item>
          <el-menu-item index="/setting" class="menu_item">
            <svg-icon
              value="icon-shezhi"
              :size="1.2"
            ></svg-icon>
            <span slot="title">Settings</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-aside>
    <el-drawer
      v-else
      :with-header="false"
      :visible.sync="isCollapse"
      direction="ltr"
      size="75%"
    >
      <div class="logo">
        <el-image
          class="collapse_n_img"
          :src="require('../../assets/img/logo.png')"
          fit="scale-down"
        >
        </el-image>
      </div>
      <el-menu
        background-color="#304156"
        text-color="#bfcbd9"
        :default-active="path"
        unique-opened
        router
      >
        <el-menu-item index="/Verification" class="menu_item" v-if="path=='/Verification'">
          <svg-icon value="icon-linkman-contacts_ico" :size="1.1"></svg-icon>
          <span slot="title">Profile verification</span>
        </el-menu-item>
        <div v-else>
          <el-menu-item index="/home" class="menu_item">
            <svg-icon value="icon-shouye1" :size="1.1"></svg-icon>
            <span slot="title">Home</span>
          </el-menu-item>
          <el-menu-item index="/analystics" class="menu_item">
            <svg-icon value="icon-shuju1" :size="1.1"></svg-icon>
            <span slot="title">Analystics</span>
          </el-menu-item>
          <el-menu-item index="/reviews" class="menu_item">
            <svg-icon
              value="icon-pinglun"
              :size="1.2"
            ></svg-icon>
            <span slot="title">Reviews</span>
          </el-menu-item>
          <el-menu-item index="/reviews" class="menu_item">
            <i class="el-icon-delete"></i>
            <span slot="title">Settings</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-drawer>
    <el-container class="right_container">
      <el-header class="header">
        <div class="header_left">
          <span class="h_l_icon" @click="isCollapse = !isCollapse">
            <svg-icon
              :value="isCollapse ? 'icon-zhedie2' : 'icon-shouqi'"
              :size="1.2"
            ></svg-icon>
          </span>
          <div v-if="path=='/Verification' && user">{{user.webSite.split('/')[2]}}</div>
          <el-breadcrumb separator="/" v-else>
            <el-breadcrumb-item
              v-for="item in levelList"
              :key="item.path"
              v-if="item.meta.title"
              :to="item.redirect || item.path"
              >{{ item.meta.title }}</el-breadcrumb-item
            >
          </el-breadcrumb>
        </div>
        <div class="header_right">
          <el-popover
            v-if="newMsg"
            placement="bottom"
            width="250"
            trigger="hover">
            <div class="new_msg">
              <p>Notifications</p>
              <div v-if="newMsg.editTotal==0 && newMsg.newTotal==0">You do not have any new activity</div>
              <div class="have_new" v-if="newMsg.newTotal>0" @click="handleNewMsg(newMsg.newData)">
                <i class="el-icon-s-opportunity"></i>
                <span>You have {{newMsg.newTotal}} new review</span>
              </div>
              <div class="have_new" v-if="newMsg.editTotal>0" @click="handleNewMsg(newMsg.editData)">
                <i class="el-icon-s-opportunity"></i>
                <span>You have {{newMsg.editTotal}} updated review</span>
              </div>
            </div>
            <el-badge :is-dot="newMsg.editTotal==0 && newMsg.newTotal==0?false:true" class="item" slot="reference">
              <i class="el-icon-message-solid"></i>
            </el-badge>
          </el-popover>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar
                size="large"
                :src="require('../../assets/img/user-admin.png')"
              ></el-avatar>
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item disabled>
                <div>{{user.firstName}}</div>
                <div>{{user.workEmail}}</div>
              </el-dropdown-item>
              <!-- <el-dropdown-item divided command="1">Set Up</el-dropdown-item> -->
              <el-dropdown-item command="2">Change Password</el-dropdown-item>
              <el-dropdown-item divided command="6">Log out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import type from "../../commons/type";
import {isMobile} from "../../commons";
export default {
  data() {
    return {
      isCollapse: false, //侧边栏是否收缩
      levelList: null, //面包屑
      user: null, //用户信息
      path:null, //当前路由
      newMsg:null //新消息
    };
  },
  watch: {
    $route(to, from) {
      this.getBreadcrumb();
      this.path=to.fullPath;
    },
  },
  mounted() {
    if(this.path!="/Verification"){
      this.getNewMsgData();
    }
    this.getBreadcrumb();
    this.$bus.$on('newMsg',(val)=>{
      this.getNewMsgData();
    })
  },
  created() {
    this.path = this.$route.path;
    this.user = JSON.parse(localStorage.getItem(type.USER));
  },
  methods: {
    isMobile,
    /**
     * 查看新消息
     */
    handleNewMsg(idData){
      this.$router.push({
        path:"/reviews",
        query:{
          review_id:idData,
          type:'reply'
        }
      })
      // this.getNewMsgData();
    },
    /**
     * 获取新消息数量
     */
    getNewMsgData(){
      this.$apiHttp.siteNewAndEditReviews().then((resp)=>{
        if(resp.res==200){
          this.newMsg=resp.data;
        }
      })
    },
    /**
     * 头部下拉菜单
     */
    handleCommand(com) {
      if (com == 6) {
        this.$store.dispatch("logout");
        this.$router.replace({
          path: "/",
        });
      }else if(com == 2){
        this.$router.replace({
          path: "/password-reset",
          query:{
            email:this.user.workEmail
          }
        });
      } 
    },
    /**
     * 面包屑
     */
    getBreadcrumb() {
      if(this.path=='/Verification'){
        return;
      }else{
        let matched = this.$route.matched.filter((item) => item.meta.title);
        this.levelList = matched;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  .aside {
    background-color: #304156;
    .el-menu {
      border: none;
    }
    .logo {
      width: 100%;
      height: 60px;
      padding: 10px 0;
      line-height: 50px;
      background: #2b2f3a;
      text-align: center;
      .collapse_n_img {
        height: 100%;
        width: 100%;
        /deep/img {
          height: 100%;
        }
      }
      .collapse_img {
        height: 100%;
        width: 100%;
        /deep/img {
          height: auto;
          width: 100%;
          vertical-align: middle;
        }
      }
    }
    .menu_item {
      svg {
        margin-right: 8px;
      }
    }
  }
  /deep/.el-drawer.ltr{
    background: #304156;
    .el-menu {
      border: none;
    }
    .logo {
      width: 100%;
      height: 60px;
      padding: 5px 0;
      line-height: 50px;
      background: #2b2f3a;
      text-align: center;
      .collapse_n_img {
        height: 100%;
        width: 100%;
        /deep/img {
          height: 100%;
        }
      }
    }
  }
  .right_container {
    .header {
      height: 50px !important;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding-left: 0;
      .header_left {
        height: 100%;
        line-height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        .h_l_icon {
          padding: 0 15px;
          height: 100%;
          display: block;
          line-height: 59px;
          cursor: pointer;
          &:hover {
            background: #f9f9f9;
          }
        }
      }
      .header_right {
        display:flex;
        align-items: center;
        .el-icon-message-solid{
          font-size:24px;
          cursor:pointer;
        }
        .el-dropdown{
          margin-left: 26px;
        }
        .el-dropdown-link {
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .main {
      padding: 0;
    }
  }
}
.el-popover {
  .new_msg{
    p{
      font-weight: 600;
      color:#333333;
    }
    .have_new{
      display:flex;
      align-items: center;
      cursor: pointer;
      margin-top: 5px;
      &:hover{
        color:#1989fa;
      }
      span{
        margin-left:3px;
      }
    }
  }
}
</style>
