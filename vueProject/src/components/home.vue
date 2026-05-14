<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goRegister = () => {
    router.push('/register')
}


</script>





<template>
    <div class="min-h-screen bg-cover bg-center flex items-center justify-center"
        style="background-image: url('/backGround.png')">

        <!-- 讓背景變暗 -->
        <div class="absolute inset-0 bg-black/20 pointer-events-none"></div>
        <div class="min-h-screen flex flex-col bg-cover bg-center">

            <!-- Header -->
            <div class="p-4 text-white text-xl font-bold">
                首頁
            </div>

            <!-- Content -->
            <div class="flex-1 flex items-center justify-center">
                <!-- grid -->
                 歡迎登入
            </div>

        </div>

    </div>
</template>