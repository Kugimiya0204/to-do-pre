<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
const Name = computed(() => {
  return document.cookie.substring(5, 8)
})
</script>

<template>
  <div>
    <RouterView name="topNavbar" v-model="Name"></RouterView>
    <RouterView></RouterView>
    <RouterView name="botNavbar"></RouterView>
  </div>
</template>

<style scoped></style>
