<template>
  <div class="home-container">
    <div class="page-header">
      <h1>A股股票筛选工具</h1>
      <p class="subtitle">根据自定义条件筛选股票</p>
    </div>
    
    <FilterPanel v-if="isFilterVisible" />
    
    <StockList />
    
    <el-backtop :right="20" :bottom="20" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import FilterPanel from '@/components/filter/FilterPanel.vue';
import StockList from '@/components/stock/StockList.vue';
import { useFilterStore } from '@/stores/filter';
import { useStocksStore } from '@/stores/stocks';

const filterStore = useFilterStore();
const stocksStore = useStocksStore();
const isFilterVisible = computed(() => filterStore.isFilterVisible);

// 初始化时加载默认筛选结果
onMounted(async () => {
  try {
    await stocksStore.fetchFilteredStocks();
  } catch (error) {
    console.error('Failed to fetch initial stocks:', error);
  }
});
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.page-header h1 {
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
}

@media (min-width: 768px) {
  .page-header {
    margin-bottom: 2rem;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1.125rem;
  }
}
</style>