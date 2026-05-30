<script setup lang="ts">
import { useStore } from "../stores/pinia"
import { io } from "socket.io-client"
import { ref, onMounted, onBeforeUnmount } from 'vue'
import HomeHeader from "./homeHeader.vue";
import OnLine from "./onLine.vue";
import HomeChatList from "./homeChatList.vue";
import HomeChat from "./homeChat.vue";



const store = useStore();


// 線上登入人
interface OnlineUser {
    id: string
    account: string
    username: string
}
const onlineUsers = ref<OnlineUser[]>([])

// 聊天訊息
interface ChatMessage {
    id: string
    userId: string
    username: string
    content: string
    createdAt: string
}

const messages = ref<ChatMessage[]>([])



onMounted(() => {
    store.socket = io("https://vue3-ta92.onrender.com");

    store.socket.emit("userOnline", store.user);

    store.socket.on("onlineUsers", (users: OnlineUser[]) => {
        onlineUsers.value = users;
        store.onlineUsers = users;
    });
    store.socket.on("newMessage", (message: ChatMessage) => {
        messages.value.push(message);
        store.messages.push(message)

    })
});

onBeforeUnmount(() => {
    if (store.socket) {
        store.socket.disconnect();
    }
});


</script>





<template>

    <div class="min-h-screen bg-cover bg-center p-6 text-white" style="background-image: url('/Vue3/backGround.png')">
        <!-- Header -->
        <HomeHeader />
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-120px)] min-h-0">

            <!-- 左邊 聊天室列表 -->
            <HomeChatList />

            <!-- 中間 -->
            <HomeChat />

            <!-- 右邊 -->
            <OnLine />

        </div>
    </div>
</template>