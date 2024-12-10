<template>
  <section class="search">
    <h3 class="search__title">Введите значение</h3>
    <input v-model="searchQuery" class="search__input" @keyup="handleKeyup" />
    <ShowingListLocations
      v-if="locationsList.length"
      :locations="locationsList"
    />
    <div v-else-if="!locationsList.length && searchQuery.length">
      Ничего не найдено
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { type ILocation } from "@/stores/types";
import { useSearchStore } from "@/stores/searchStore";
import { debounce } from "@/composables/useComposables";
import ShowingListLocations from "@/components/ShowingListLocations.vue";

const searchQuery = ref<string>("");
const locationsList = ref<ILocation[]>([]);

const handleKeyup = debounce((event: Event) => {
  const searchStore = useSearchStore();
  const { value } = event.target as HTMLInputElement;
  searchStore.fetchLocations(value);
  locationsList.value = searchStore.locations;
}, 200);
</script>

<style scoped>
.search {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search__input {
  max-width: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  transition: border-color 0.2s;
  margin-bottom: 30px;
}

.search__input:focus {
  border-color: #448bd6;
  outline: none;
}

.search__input::placeholder {
  color: #aaa;
}

.search__title {
  color: #0d2c70;
}
</style>
