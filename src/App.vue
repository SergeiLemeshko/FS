<template>
  <header class="header">
    <div>
      <div>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </div>
    </div>
  </header>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
