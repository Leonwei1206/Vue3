// stores/pinia.ts
import { defineStore } from 'pinia'

interface OnlineUser {
  id: string
  account: string
  username: string
}
// 聊天訊息
interface ChatMessage {
    id: string
    userId: string
    username: string
    content: string
    createdAt: string
}
export const useStore = defineStore('pinia', {
  state: () => ({
    user:{} as any,
    onlineUsers:[] as OnlineUser[],
    messages:[] as ChatMessage[],
    socket: null as any,
  }),

  actions: {
  
  }
})