import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartList: []
  }),
  actions: {
    addToCart(product) {
      this.cartList.push(product)
    }
  }
})
