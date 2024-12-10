<template>
  <section>
    <div v-for="(place, idx) in props.locations" :key="idx">
      <ItemLocation :location="place" />
    </div>
  </section>
</template>

<script setup lang="ts">
import ItemLocation from "@/components/ItemLocation.vue";
import { type ILocation } from "@/stores/types";

const props = defineProps<{
  locations: ILocation[];
}>();
</script>
