<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <RouterView name="topNavbar"></RouterView>
    <RouterView></RouterView>
    <RouterView name="botNavbar"></RouterView>
  </div>
</template>

<style scoped></style>
