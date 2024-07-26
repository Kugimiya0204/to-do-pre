<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary bg-info-subtle border border-info">
    <div class="container-fluid">
      <a class="navbar-brand">TODO API</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page">Home</a>
          </li>
          <li class="nav-item">
            <a v-if="name" class="nav-link active" aria-current="page">使用者:{{ name }}</a>
          </li>
          <li class="nav-item">
            <span class="nav-link">
              <RouterLink :to="{ name: 'login' }">登入</RouterLink>
            </span>
          </li>
          <li class="nav-item">
            <a class="btn" @click="cleanCookie">登出</a>
          </li>
          <li class="nav-item">
            <span class="nav-link">
              <RouterLink :to="{ name: 'data' }">資料庫</RouterLink>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'

const name = defineModel()

const router = useRouter()

function cleanCookie() {
  document.cookie = 'user=;'
  router.push({ name: 'login' })
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
</style>
