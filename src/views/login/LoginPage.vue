<template>
  <div class="area">
    <h1 class="my-3">Login page</h1>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Username" v-model="username" />
    </div>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Password" v-model="password" />
    </div>
    <button class="btn btn-outline-secondary mb-3" type="button" @click="login">登入</button>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/counter'

const router = useRouter()
const username = ref(null)
const password = ref(null)
const { userlogin } = useUserStore()
const { Loginuser } = storeToRefs(useUserStore())

function login() {
  userlogin(username.value, password.value)
  if (Loginuser.value) {
    return router.push({ name: 'Home' })
  } else {
    alert('登入失敗')
  }
}
</script>

<style scoped>
.area {
  text-align: center;
  width: 50%;
  margin-left: 25%;
}
</style>
