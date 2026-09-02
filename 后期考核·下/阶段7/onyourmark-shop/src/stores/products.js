import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: []
  }),
  actions: {
    async fetchProducts() {
      const productData = localStorage.getItem('products');
      if (productData) {
        this.products = JSON.parse(productData);
      } else {
        try {
          const { data } = await axios.post('/product');
          if (data.code === 200) {
            this.products = data.data;
            localStorage.setItem('products', JSON.stringify(data.data));
          }
        } catch (error) {
          console.error('获取小商品数据失败:', error);
        }
      }
    },
    addProduct(product) {
      this.products.push(product)
    },
    deleteProduct(id) {
      this.products = this.products.filter(p => p.id !== id)
    }
  }
})