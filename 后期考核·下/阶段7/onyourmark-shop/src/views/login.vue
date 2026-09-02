<template>
  <div class="login-box">
    <h2>用户登录</h2>
    <el-input v-model="username" placeholder="用户名"></el-input>
    <el-input v-model="password" type="password" placeholder="密码"></el-input>
    <el-button type="primary" @click="login">登录</el-button>
    <el-button @click="$router.push('/register')">去注册</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Cookies from 'js-cookie'

const router = useRouter()
const username = ref('')
const password = ref('')

const login = async () => {
  const res = await axios.post('/login', { username: username.value, password: password.value })
  if (res.data.code === 200) {
    Cookies.set('token', res.data.token)
    alert('登录成功')
    router.push('/home')
  } else {
    alert(res.data.message)
  }
}
</script>

<style scoped>
.login-box {
  width: 300px;
  margin: 100px auto;
}
.el-input {
  margin:10px 0;
}
</style>