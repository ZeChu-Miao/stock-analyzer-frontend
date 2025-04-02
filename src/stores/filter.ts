import { defineStore } from 'pinia';

export const useFilterStore = defineStore('filter', {
  state: () => ({
    isFilterVisible: false
  }),
  
  actions: {
    setFilterVisibility(visible: boolean) {
      this.isFilterVisible = visible;
    },
    
    toggleFilterVisibility() {
      this.isFilterVisible = !this.isFilterVisible;
    }
  }
});