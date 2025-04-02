<template>
  <div class="filter-panel" :class="{ 'filter-panel-visible': isVisible }">
    <div class="filter-panel-header">
      <h3>筛选条件</h3>
      <el-button 
        type="text" 
        icon="el-icon-close" 
        @click="closeFilter"
      />
    </div>
    
    <div class="filter-panel-body">
      <FilterForm @filter-applied="onFilterApplied" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import FilterForm from './FilterForm.vue';
import { useFilterStore } from '@/stores/filter';

const filterStore = useFilterStore();
const isVisible = computed(() => filterStore.isFilterVisible);

const closeFilter = () => {
  filterStore.setFilterVisibility(false);
};

const onFilterApplied = () => {
  // 在移动端上应用筛选后自动关闭筛选面板
  if (window.innerWidth < 768) {
    closeFilter();
  }
};
</script>

<style scoped>
.filter-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 1000;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  overflow-y: auto;
  padding-top: 60px; /* 为头部留出空间 */
}

.filter-panel-visible {
  transform: translateX(0);
}

.filter-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 1001;
}

.filter-panel-body {
  padding: 1rem;
}

@media (min-width: 768px) {
  .filter-panel {
    position: static;
    transform: none;
    width: 100%;
    height: auto;
    padding-top: 0;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
  }
  
  .filter-panel-header {
    position: static;
    padding: 1rem 1.5rem;
  }
  
  .filter-panel-body {
    padding: 1rem 1.5rem;
  }
}
</style>