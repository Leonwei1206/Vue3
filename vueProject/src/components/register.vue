<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()

const account = ref('');
const password = ref('');
const confirmPassword = ref('');

// 跳轉回首頁
const goHome = () => {
    router.push('/');
}
const errors = ref({
    account: '',
    password: '',
    confirmPassword: ''
})
//判斷是否使用中文及注音
const hasInvalidChar = (val: string) =>
    /[一-龥]/.test(val) || /[\u3105-\u312F]/.test(val);


// 判斷帳號密碼錯誤訊息
const validateField = (val: string, name: string) => {
    // 是否為輸入
    if (!val) return `請輸入${name}`
    // 使用中文或注音
    if (hasInvalidChar(val)) return `${name}不能使用中文或注音`
    return ''
}
// 註冊按鈕
const handleRegister = async () => {
    console.log("d");
    errors.value = {
        account: validateField(account.value, '帳號'),
        password: validateField(password.value, '密碼'),
        confirmPassword: validateField(confirmPassword.value, '確認密碼')
    }

    if (Object.values(errors.value).some(e => e)) return

    const res = await fetch('https://vue3-ta92.onrender.com/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            account: account.value,
            password: password.value
        })
    })

    const data = await res.json();
    console.log(data);
    if (res.ok) {
        alert(data.message);
        router.push('/');
    } else {
        alert(data.message)
    }

}

</script>




<template>
    <div class="min-h-screen bg-cover bg-center flex items-center justify-center"
        style="background-image: url('/backGround.png')">
        <!-- 讓背景變暗 -->
        <div class="absolute inset-0 bg-black/20 pointer-events-none"></div>

        <!-- 主要內容 -->
        <div class="grid grid-cols-12 gap-10 px-6 w-full max-w-6xl relative z-20">

            <!-- 左邊文字 -->
            <div class="col-span-12 md:col-span-6 text-white flex flex-col justify-center">
                <h1 class="text-4xl font-bold mb-4 ml-4">
                    加入我們
                </h1>

                <p class="text-lg opacity-80 ml-4">
                    開始你的聊天之旅，建立你的帳號
                </p>
            </div>

            <!-- 右邊白色卡片 -->
            <div class="col-span-12 md:col-span-6 flex justify-center">

                <div class="w-full max-w-xs bg-white border border-gray-200 rounded-2xl shadow-xl p-6">

                    <h2 class="text-2xl font-bold mb-6 text-center">
                        註冊帳號
                    </h2>

                    帳號 <input v-model="account" class="w-full border p-2 rounded mb-3" placeholder="帳號" />
                    密碼<input v-model="password" class="w-full border p-2 rounded mb-3" placeholder="密碼"
                        type="password" />
                    確認密碼<input v-model="confirmPassword" class="w-full border p-2 rounded mb-3" placeholder="再次確認密碼"
                        type="password" />
                    <div class="flex justify-end">
                        <button type="button" @click="handleRegister"
                            class="w-full text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-full text-sm px-6 py-2.5 focus:outline-none">
                            建立帳號
                        </button>

                    </div>

                    <p class="text-red-500 text-sm mt-4">{{ errors.account }}</p>
                    <p class="text-red-500 text-sm">{{ errors.password }}</p>
                    <p class="text-red-500 text-sm">{{ errors.confirmPassword }}</p>

                    <p class="text-sm text-center mt-4 text-gray-500 cursor-pointer hover:text-blue-500 hover:underline"
                        @click="goHome">
                        已經有帳號？去登入
                    </p>
                </div>
            </div>

        </div>
    </div>
</template>