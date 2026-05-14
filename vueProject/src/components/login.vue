<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const goRegister = () => {
  router.push('/register')
}
const account = ref('');
const password = ref('');

const loginerr = ref('');
// 登入按鈕
const loginHome = async () => {

  const res = await fetch('https://vue3-ta92.onrender.com/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      account: account.value,
      password: password.value
    })
  })

  const data = await res.json()

  if (data.success) {
    // 
    localStorage.setItem('token',data.token)
    router.push('/home')
  } else {
    loginerr.value = "帳號或密碼錯誤";
  }


}


</script>





<template>
  <div class="min-h-screen bg-cover bg-center flex flex-col relative"
    style="background-image: url('/loginBackground.png')">
    <!-- 讓背景變暗 -->
    <div class="absolute inset-0 bg-black/20 pointer-events-none"></div>

    <!-- 上 -->
    <div class="p-2 mt-2">
      <h2 class="text-2xl font-bold text-center">登入</h2>
    </div>

    <!--中 主要內容 -->
    <div class="flex-1 flex items-start justify-center pt-16 relative z-20">

      <div class="grid grid-cols-12 gap-10 w-full max-w-6xl">
        <!-- 左邊文字 -->
        <div class="col-span-12 md:col-span-6 text-white flex flex-col justify-center">
          <h1 class="text-5xl font-bold mb-6 ml-8 leading-tight">
            歡迎回來
          </h1>

          <p class="text-lg opacity-80 ml-8 max-w-md">
            登入你的帳號，繼續你的聊天旅程，與朋友保持即時連線
          </p>
        </div>

        <!-- <div class="col-span-6 grid place-items-center"> -->
        <div class="col-span-12 md:col-span-6 flex justify-center">

          <div
            class="w-full max-w-xs min-h-[300px] bg-white border border-gray-200 rounded-2xl shadow-xl p-6 flex flex-col justify-center">
            <h2 class="text-2xl font-bold mb-6 text-center">
              登入帳號
            </h2>

            <div class="flex flex-col gap-1">
              <label>帳號</label>
              <input v-model="account" type="text" placeholder="帳號" class="border p-2 rounded w-full" />
            </div>

            <div class="flex flex-col gap-1">
              <label>密碼</label>
              <input v-model="password" type="password" placeholder="密碼" class="border p-2 rounded w-full" />
            </div>

            <div class="flex justify-between items-center mt-4">

              <!-- 左邊：註冊 -->
              <button @click="goRegister" class="bg-blue-500 text-white p-2 rounded">
                註冊帳號
              </button>

              <!-- 右邊：登入 -->
              <button @click="loginHome" class="bg-blue-500 text-white p-2 rounded">
                登入
              </button>
              
            </div>
            <p class="text-center text-red-500 text-sm mt-4">{{ loginerr }}</p>
          </div>



        </div>

      </div>
    </div>

  </div>




</template>
