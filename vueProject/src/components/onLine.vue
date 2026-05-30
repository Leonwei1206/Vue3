<script setup lang="ts">
import { useStore } from "../stores/pinia"

const store = useStore();







</script>



<template>

    <div class="hidden lg:flex lg:col-span-3 h-full bg-white/10 backdrop-blur-md rounded-2xl p-4 flex-col min-h-0">
        <h2 class="text-xl font-bold mb-4">線上使用者</h2>
        <div class="space-y-3">
            <div v-for="user in store.onlineUsers" :key="user.id" class="flex items-center gap-2">
                <span class="text-green-400">🟢</span>

                <span>{{ user.username }}</span>

            </div>
        </div>
    </div>



</template>
