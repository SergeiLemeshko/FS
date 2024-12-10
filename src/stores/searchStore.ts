import { ref } from 'vue';
import { defineStore } from 'pinia';
import { type ILocation } from '@/stores/types';

export const useSearchStore = defineStore('search', () => {
  const locations = ref<ILocation[]>([]);

  const fetchLocations = async (query: string) => {
    if (!query) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      locations.value = data;
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  return { fetchLocations, locations };
})
