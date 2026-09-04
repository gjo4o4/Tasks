<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="brand-title">onyourmark</h1>
      <div class="login-image">
        <img src="@/assets/images/logo.jpg" alt="logo">
      </div>
      <h2 class="login-title">用户注册</h2>
      <el-input v-model="username" placeholder="请输入用户名"></el-input>
      <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
      <el-input v-model="repassword" type="password" placeholder="请再次输入密码"></el-input>
      <div class="btn-group">
        <el-button type="primary" @click="handleRegister">注册</el-button>
        <el-button class="register-btn" @click="$router.push('/login')">返回登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const username = ref('')
const password = ref('')
const repassword = ref('')

const handleRegister = async () => {
  // 判断两次密码是否一致
  if(password.value !== repassword.value){
    alert("两次输入密码不一致！")
    return
  }
  const res = await axios.post('/register',{
    username: username.value,
    password: password.value
  })
  if(res.data.code ===200){
    alert("注册成功，请登录")
    //注册成功跳回登录页面
    router.push('/login')
  }else{
    alert(res.data.message)
  }
}
</script>

<style scoped>
.login-container {
  background-color: #84e2ff;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-box {
  width: 320px;
  padding: 30px;
  background: #ffffff;
  border-radius: 10px;
}

.brand-title {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 14px 0;
  color: #222;
}

.login-image {
  width: 100%;
  margin-bottom:14px;
  display:flex;
  justify-content:center;
}
.login-image img {
  width:120px;
  height:120px;
  object-fit: cover;
  border-radius:50%;
}

.login-title {
  text-align: center;
  margin:0 0 16px 0;
  font-size:18px;
  color:#333;
}

.el-input {
  margin:10px 0;
}

.btn-group{
  display: flex;
  gap:12px;
  margin-top:15px;
}

.register-btn {
  flex: 1;
  border: 1px solid #409eff;
  color: #409eff;
  background-color: #fff;
}
.register-btn:hover {
  background-color: #ecf5ff;
  border-color:#409eff;
  color:#409eff;
}
.btn-group .el-button {
  flex:1;
}
</style>
