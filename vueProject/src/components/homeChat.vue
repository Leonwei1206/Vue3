<script setup lang="ts">
import { useStore } from "../stores/pinia"
import { ref } from 'vue'



const store = useStore();

const messageText = ref("");
const sendMessage = () => {
    if (!messageText.value.trim()) return

    store.socket.emit("sendMessage", {
        userId: store.user.id,
        username: store.user.username,
        content: messageText.value
    })

    messageText.value = ""
}




</script>



<template>


    <div class="col-span-1 lg:col-span-6 h-full bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col min-h-0">
        <h2 class="text-2xl font-bold mb-4">大家的聊天室</h2>
        <!-- 手機版在線使用者 -->
        <div class="lg:hidden mb-4">

            <div class="flex gap-2 overflow-x-auto pb-2">

                <div v-for="user in store.onlineUsers" :key="user.id"
                    class="shrink-0 px-3 py-2 rounded-full bg-white/15 flex items-center gap-2">
                    <span class="text-green-400">🟢</span>

                    <span class="text-sm">
                        {{ user.username }}
                    </span>
                </div>

            </div>

        </div>
        <div class="flex-1 min-h-0 space-y-3 overflow-y-auto pr-2">
            <div v-for="msg in store.messages" :key="msg.id" :class="[
                'rounded-xl p-3 w-fit max-w-[70%]',
                msg.userId === store.user.id
                    ? 'bg-blue-500 ml-auto'
                    : 'bg-white/20']">
                <div class="text-xs opacity-70 mb-1">
                    {{ msg.username }}
                </div>
                <div>
                    {{ msg.content }}
                </div>
            </div>
        </div>
        <div class="mt-4 flex gap-2">
            <input v-model="messageText" @keyup.enter="sendMessage" class="flex-1 rounded-2xl px-5 py-4 bg-white/15 backdrop-blur-md
                        border border-white/20 placeholder-white/50 text-white focus:outline-none
                        focus:ring-2 focus:ring-blue-400" placeholder="輸入訊息..." />
            <button type="button" @click="sendMessage"
                class="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">送出</button>
        </div>
    </div>
</template>