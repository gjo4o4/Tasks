<template>
  <el-container>
    <el-header>
      <NavBar />
    </el-header>
    <el-main>
      <el-button type="success" @click="showAddDialog = true">添加商品</el-button>
      <el-row :gutter="20">
        <el-col :span="6" v-for="product in productStore.products" :key="product.id">
          <el-card>
            <img :src="product.image" style="width:100%;height:150px;object-fit:cover"/>
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <el-button type="danger" @click="deleteProduct(product.id)">删除</el-button>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>

  <el-dialog v-model="showAddDialog" title="新增商品">
    <el-input v-model="newProduct.name" placeholder="商品名称"></el-input>
    <el-input v-model="newProduct.description" placeholder="商品描述"></el-input>
    <el-input v-model="newProduct.image" placeholder="图片地址"></el-input>
    <template #footer>
      <el-button @click="showAddDialog = false">取消</el-button>
      <el-button type="primary" @click="addProduct">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import NavBar from '../components/navBar.vue'
import { useProductStore } from '../stores/products'

const productStore = useProductStore()
const showAddDialog = ref(false)
const newProduct = ref({
  name: '',
  description: '',
  image: ''
})

const addProduct = () => {
  const id = productStore.products.length + 1
  productStore.addProduct({ ...newProduct.value, id })
  showAddDialog.value = false
  newProduct.value = { name: '', description: '', image: '' }
}

const deleteProduct = (id) => {
  ElMessageBox.confirm('确定删除？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    productStore.deleteProduct(id)
  })
}

onMounted(() => {
  productStore.fetchProducts()
})
</script>
