<template>
  <div>
    <NavBar />
    <h2>花店首页</h2>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in productStore.products" :key="item.id">
        <el-card>
          <img :src="item.image" style="width:100%;height:150px;object-fit:cover"/>
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <el-button type="success" @click="cartStore.addToCart(item)">加入购物车</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import NavBar from '../components/navBar.vue'
import { useProductStore } from '../stores/products'
import { useCartStore } from '../stores/cart'

const productStore = useProductStore()
const cartStore = useCartStore()

onMounted(() => {
  productStore.fetchProducts()
})
</script>
