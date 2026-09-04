<template>
  <el-container>
    <el-header class="header">
      <Navbar :default-active="activeIndex" />
    </el-header>
    <el-main>
      <el-card class="about-card">
        <h2>关于我们</h2>
        <p>这里是onyourmarkRoom 欢迎在Mark小店购买商品</p >
        <p>感谢您的支持与信任！如果您有什么问题，可以及时联系我们</p >
        <el-button type="primary" class="contact-btn">联系我们</el-button>
      </el-card>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'

const activeIndex = ref('4')
</script>

<style scoped>
.header {
  background-color: #84e2ff;
}
.about-card {
  max-width: 700px;
  margin: 40px auto;
  text-align: center;
  padding:30px;
}
.about-card h2 {
  margin-bottom:20px;
  font-size:20px;
}
.about-card p {
  margin:12px 0;
  font-size:15px;
  line-height:1.7;
}
.contact-btn {
  margin-top:20px;
}
</style>
