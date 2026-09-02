<template>
  <div>
    <NavBar />
    <div class="about">
      <h2>关于我们</h2>
      <p>这里是onyourmarkRoom 欢迎购买</p>
      <el-button>联系我们</el-button>
    </div>
  </div>
</template>

<script setup>
import NavBar from '../components/navBar.vue'
</script>

<style scoped>
.about {
  padding:30px;
}
</style>
