<script setup lang="ts">
import { useStore } from "../stores/pinia"
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore();
// 使用者名稱
const nsername = store.user.username;
// 使用者名稱第一個字
const avatarText = nsername.charAt(0);



// 前往首頁
const gologin = () => {
  router.push('/')
}

</script>


<template>
    <div class="mb-4 px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20
    text-white flex flex-col gap-3
    lg:h-16 lg:px-6 lg:py-0 lg:flex-row lg:items-center lg:justify-between">
        <!-- 第一排 -->
        <div class="flex items-center justify-between">
            <div class="text-xl lg:text-2xl font-bold">
                ChatRoom
            </div>

            <!-- 手機版右側 -->
            <div class="flex lg:hidden items-center gap-3">

                <div class="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/15 whitespace-nowrap text-sm">
                    <span class="text-green-400">🟢</span>
                    <span>{{ store.onlineUsers.length }} 人</span>
                </div>

                <div class="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center font-bold">
                    {{ avatarText }}
                </div>

                <button @click="gologin" class="px-3 py-2 rounded-full bg-red-500 hover:bg-red-600 
                text-sm font-medium">
                    登出
                </button>

            </div>
        </div>

        <!-- 中間歡迎文字：手機版小一點 -->
        <div class="text-base lg:text-xl font-semibold text-white/90">
            歡迎回來，{{ nsername }}
        </div>

        <!-- 桌機版右側 -->
        <div class="hidden lg:flex items-center gap-4">
            <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 whitespace-nowrap">
                <span class="text-green-400">🟢</span>
                <span>線上 {{ store.onlineUsers.length }} 人</span>
            </div>

            <button class="text-xl">
                🔔
            </button>

            <div class="flex items-center gap-2 px-3 py-2 rounded-full bg-white/15">
                <div class="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center font-bold">
                    {{ avatarText }}
                </div>
                <span>{{ nsername }}</span>
            </div>

            <button @click="gologin" class="text-white bg-red-500 hover:bg-red-600 font-medium rounded-full text-sm
            px-6 py-2.5 focus:outline-none">
                登出
            </button>
        </div>
    </div>

</template>