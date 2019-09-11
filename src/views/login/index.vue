<template>
  <div id="login">
    <el-card class="box-card">
      <div class="bgcimg">
        <img src="../../assets/images/logo_index.png" alt />
      </div>

      <!-- 表单 -->
      <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号" style="margin-top:30px"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" style="width:280px" placeholder="请输入验证码"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked" style="margin-right:20px"></el-checkbox>我已阅读并同意
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号'))
      }
    }
    return {
      // 绑定表单数据
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 配置表单验证规则
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'click' }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      // 默认选中
      checked: true
    }
  },
  methods: {
    // 整体表单验证
    login () {
      // 整体表单验证
      this.$refs.loginForm.validate(async valid => {
        // 如果成功 跳转到首页
        if (valid) {
          try {
            // 发送登陆请求
            const res = await this.axios.post('authorizations', this.loginForm)
            // 存储token 保持会话状态
            window.sessionStorage.setItem(
              'login',
              JSON.stringify(res.data.data)
            )
            // 跳转到首页
            this.$router.push('/home')
          } catch (error) {
            this.$message.error('手机号或验证码不正确，请从新输入')
          }
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
#login {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .box-card {
    width: 500px;
    height: 400px;
    padding: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .bgcimg img {
      display: block;
      width: 200px;
      margin: 0 auto;
    }
  }
}
</style>
