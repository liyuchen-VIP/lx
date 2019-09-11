<template>
  <el-container class="home-container">
    <!-- 侧边栏 -->
    <el-aside class="my-aside" :width="collapse?'64px':'200px'">
      <span class="aside-top" :class="{minimg:false}"></span>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
        :collapse="collapse"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/home">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document-copy"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture-outline"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-position"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-line-square"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-potato-strips"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-chicken"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header class="my-header">
        <span class="el-icon-s-fold" @click="toggleMeun()"></span>
        <span style="vertical-align: middle">山东宇晨国际食品文化有限公司</span>
        <el-dropdown class="my-set">
          <span class="el-dropdown-link">
            <img
              width="30px"
              style="vertical-align: middle"
              :src="avatar"
              alt
            />
            <span style="padding-left:10px">{{name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="setting">个人设置</el-dropdown-item>
            <el-dropdown-item @click.native="logtou">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 主体 -->
      <el-main class="my-content">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      collapse: false,
      name: '',
      avatar: ''
    }
  },
  created () {
    const user = JSON.parse(window.sessionStorage.getItem('login'))
    this.name = user.name
    this.avatar = user.photo
  },
  methods: {
    // 侧边栏缩放
    toggleMeun () {
      this.collapse = !this.collapse
    },
    setting () {
      this.$router.push('/setting')
    },
    logtou () {
      window.sessionStorage.removeItem('login')
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped lang="less">
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .my-header {
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    .el-icon-s-fold {
      font-size: 26px;
      vertical-align: middle;
      padding-right: 20px;
    }
  }
  .my-set {
    vertical-align: middle;
    float: right;
  }
}
.my-aside {
  background-color: #002033;
  .aside-top {
    display: block;
    width: 100%;
    height: 60px;
    background: #002843 url(../../assets/images/hm.png) no-repeat center / 140px
      auto;
  }
  .minimg {
    background-image: url(../../assets/images/logo_admin_01.png);
    background-size: 36px auto;
  }
}
</style>
