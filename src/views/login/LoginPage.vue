<template>
  <h1>Login page</h1>
  <div class="input-group mb-3 inputcss">
    <input type="text" class="form-control" placeholder="Username" v-model="username" />
  </div>
  <div class="input-group mb-3 inputcss">
    <input type="text" class="form-control" placeholder="Password" v-model="password" />
  </div>
  <button class="btn btn-outline-secondary" type="button" @click="login">登入</button>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref(null)
const password = ref(null)
const loginList = [
  {
    username: 'AAA',
    password: 'aaa'
  },
  {
    username: 'BBB',
    password: 'bbb'
  },
  {
    username: 'CCC',
    password: 'ccc'
  }
]

function login() {
  if (checklogin()) {
    document.cookie = 'user=' + username.value + ';'
    return router.push({ name: 'Home' })
  }
}
function checklogin() {
  const user = loginList.find(
    (check) => check.username == username.value && check.password == password.value
  )
  return user
}
</script>

<style scoped>
.inputcss {
  width: 50%;
  text-align: center;
}
</style>
