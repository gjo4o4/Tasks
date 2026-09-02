<template>
  <el-menu mode="horizontal" class="el-menu-demo">
    <el-menu-item index="1" @click="$router.push('/home')">首页</el-menu-item>
    <el-menu-item index="2" @click="$router.push('/shop')">商品管理</el-menu-item>
    <el-menu-item index="4" @click="$router.push('/about')">关于我们</el-menu-item>
  </el-menu>
</template>

<script setup>
</script>

<style scoped>
.el-menu-demo {
  background-color: #F8C8DC;
}
</style>
