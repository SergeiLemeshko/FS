<template>
  <section class="card">
    <div class="card__content">
      {{ props.location.display_name }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { type ILocation } from "@/stores/types";

const props = defineProps<{
  location: ILocation;
}>();
</script>

<style scoped>
.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 16px;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-4px);
}

.card__content {
  font-size: 16px;
  color: #333;
}
</style>
