<script setup>
import { computed, ref } from 'vue'
import { RouterView } from 'vue-router'
const uName = ref(
  computed(() => {
    return document.cookie.substring(5, 8)
  })
)
</script>

<template>
  <div>
    <RouterView name="topNavbar" :uName></RouterView>
    <RouterView></RouterView>
    <RouterView name="botNavbar"></RouterView>
  </div>
</template>

<style scoped></style>
