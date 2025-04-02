<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo" @click="goHome">
        <i class="el-icon-data-analysis"></i>
        <span class="logo-text">股票筛选器</span>
      </div>
      
      <div class="header-actions">
        <el-button 
          v-if="!isFilterVisible" 
          type="primary" 
          size="small" 
          icon="el-icon-filter" 
          circle 
          @click="toggleFilter"
        />
        <el-button 
          v-else 
          type="info" 
          size="small" 
          icon="el-icon-close" 
          circle 
          @click="toggleFilter"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'; // 修改：使用 computed 替代 ref
import { useRouter } from 'vue-router';
import { useFilterStore } from '@/stores/filter';

const router = useRouter();
const filterStore = useFilterStore();
// 修改：使用计算属性从 store 获取状态，确保同步
const isFilterVisible = computed(() => filterStore.isFilterVisible);

const goHome = () => {
  router.push('/');
};

const toggleFilter = () => {
  // 修改：直接调用 store 的方法来切换状态
  filterStore.toggleFilterVisibility();
};
</script>

<style scoped>
.app-header {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo i {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-right: 0.5rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.header-actions {
  display: flex;
  align-items: center;
}

@media (min-width: 768px) {
  .header-content {
    padding: 1rem 1.5rem;
  }
  
  .logo i {
    font-size: 1.75rem;
  }
  
  .logo-text {
    font-size: 1.5rem;
  }
}
</style>