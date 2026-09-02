<template>
  <div class="register-box">
    <h2>用户注册</h2>
    <el-input v-model="username" placeholder="用户名"></el-input>
    <el-input v-model="password" type="password" placeholder="密码"></el-input>
    <el-button type="primary" @click="register">注册</el-button>
    <el-button @click="$router.push('/login')">返回登录</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')

const register = () => {
  if (!username.value || !password.value) {
    alert('用户名密码不能为空')
    return
  }
  alert('注册成功，请登录')
  router.push('/login')
}
</script>

<style scoped>
.register-box {
  width: 300px;
  margin: 100px auto;
}
.el-input {
  margin:10px 0;
}
</style>
