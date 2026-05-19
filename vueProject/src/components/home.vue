<script setup lang="ts">
import { useStore } from "../stores/pinia"
import { io } from "socket.io-client"
import { ref, onMounted, onBeforeUnmount } from 'vue'

const store = useStore();
// 使用者名稱
const nsername = store.user.username;

const avatarText = nsername.charAt(0);


let socket: any = null;

interface OnlineUser {
    id: string
    account: string
    username: string
}
const onlineUsers = ref<OnlineUser[]>([])


onMounted(() => {
    socket = io("https://vue3-ta92.onrender.com");

    socket.emit("userOnline", store.user);

    socket.on("onlineUsers", (users: OnlineUser[]) => {
        onlineUsers.value = users;
    });
});

onBeforeUnmount(() => {
    if (socket) {
        socket.disconnect();
    }
});



</script>





<template>

    <div class="min-h-screen bg-cover bg-center p-6 text-white" style="background-image: url('/Vue3/backGround.png')">
        <!-- Header -->
        <div
            class="h-16 mb-4 px-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-between text-white">
            <div class="text-2xl font-bold">
                ChatRoom
            </div>

            <div class="text-xl font-semibold">
                歡迎回來，{{ nsername }}
            </div>

            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 whitespace-nowrap">
                    <span class="text-green-400">🟢</span>
                    <span>線上 {{ onlineUsers.length }} 人</span>
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

                <button
                    class="w-full text-white bg-red-500 box-border border border-transparent hover:bg-red-600 focus:ring-4 focus:ring-red-300 shadow-xs font-medium leading-5 rounded-full text-sm px-6 py-2.5 focus:outline-none">
                    登出
                </button>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-4 h-[90vh]">

            <!-- 左邊 -->
            <div class="col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-4">
                <h2 class="text-xl font-bold mb-4">聊天室</h2>
                <div class="bg-white/20 rounded-xl p-3">
                    大家的聊天室
                </div>
            </div>

            <!-- 中間 -->
            <div class="col-span-7 bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col">
                <h2 class="text-2xl font-bold mb-4">大家的聊天室</h2>

                <div class="flex-1 space-y-3 overflow-y-auto">
                    <div class="bg-white/20 rounded-xl p-3 w-fit">小明：大家好</div>
                    <div class="bg-blue-500 rounded-xl p-3 w-fit ml-auto">我：嗨～</div>
                </div>

                <div class="mt-4 flex gap-2">
                    <input class="flex-1 rounded-2xl px-5 py-4 bg-white/15 backdrop-blur-md border border-white/20 placeholder-white/50
                    text-white focus:outline-none focus:ring-2 focus:ring-blue-400 " placeholder="輸入訊息..." />
                    <button type="button"
                        class="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">送出</button>
                </div>
            </div>

            <!-- 右邊 -->
            <div class="col-span-3 bg-white/10 backdrop-blur-md rounded-2xl p-4">
                <h2 class="text-xl font-bold mb-4">線上使用者</h2>
                <div class="space-y-3">
                    <div v-for="user in onlineUsers" :key="user.id" class="flex items-center gap-2">
                        <span class="text-green-400">🟢</span>

                        <span>{{ user.username }}</span>

                    </div>
                </div>
            </div>

        </div>
    </div>
</template>