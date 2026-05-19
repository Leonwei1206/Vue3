// stores/pinia.ts
import { defineStore } from 'pinia'

export const useStore = defineStore('pinia', {
  state: () => ({
   user:{} as any
  }),

  actions: {
  
  }
})