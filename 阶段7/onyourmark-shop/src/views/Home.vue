<template>
  <el-container>
    <el-header class="header">
      <Navbar :default-active="activeIndex" />
    </el-header>

    <el-main>
      <el-carousel height="260px">
        <el-carousel-item>
          <div class="banner">
            <img src="@/assets/images/background1.jpg" alt="">
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="banner">
            <img src="@/assets/images/background2.jpg" alt="">
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="banner">
            <img src="@/assets/images/background3.jpg" alt="">
          </div>
        </el-carousel-item>
      </el-carousel>

      <h2>小店首页</h2>
      <el-row :gutter="20">
        <el-col :span="6" v-for="product in productStore.products" :key="product.id">
          <el-card shadow="always" class="card-body">
            <img :src="product.image" class="image">
            <div class="card-content">
              <h3>{{ product.name }}</h3>
              <p>{{ product.description }}</p >
              <el-button type="primary" @click="showDetails(product)">详情</el-button>
              <el-button type="success" @click="addToCart(product)">加入购物车</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import { useProductStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'

const activeIndex = ref('1')
const productStore = useProductStore()
const cartStore = useCartStore()

onMounted(() => {
  productStore.fetchProducts()
})

const showDetails = (product) => {
  alert(`商品：${product.name}\n描述：${product.description}`)
}

const addToCart = (product) => {
  cartStore.addToCart(product)
  alert("已加入购物车")
}
</script>

<style scoped>
.header {
  background-color: #84e2ff;
}

.banner {
  width: 100%;
  height: 100%;
}
.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}
.card-body {
  margin-bottom: 20px;
}
.card-content h3 {
  font-size: 16px;
  margin:8px 0;
}
.card-content p {
  font-size:13px;
  color:#666;
}
</style>