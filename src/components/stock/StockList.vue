<template>
  <div class="stock-list-container">
    <div class="stock-list-header">
      <h3>筛选结果 ({{ total }})</h3>
      <span class="update-time">{{ timestamp }}</span>
    </div>
    
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="5" animated />
    </div>
    
    <div v-else-if="stocks.length === 0" class="empty-container">
      <el-empty description="暂无符合条件的股票" />
    </div>
    
    <div v-else class="stock-list">
      <StockCard 
        v-for="stock in stocks" 
        :key="stock.代码" 
        :stock="stock" 
        @click="showStockDetail(stock)"
      />
      
      <div class="load-more" v-if="hasMoreStocks">
        <el-button 
          type="primary" 
          plain 
          @click="loadMoreStocks" 
          :loading="loadingMore"
        >
          加载更多
        </el-button>
      </div>
    </div>
    
    <!-- 使用异步组件 -->
    <component 
      :is="StockDetailComponent" 
      v-if="selectedStock" 
      :stock="selectedStock" 
      :visible="detailVisible"
      @close="closeDetail"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue';
import { useStocksStore } from '@/stores/stocks';
import StockCard from './StockCard.vue';

// 使用异步组件动态导入 StockDetail
const StockDetailComponent = defineAsyncComponent(() => 
  import('./StockDetail.vue')
);

const stocksStore = useStocksStore();
const pageSize = 10;
const currentPage = ref(1);
const loadingMore = ref(false);
const detailVisible = ref(false);
const selectedStock = ref(null);

// 从 store 获取数据
const loading = computed(() => stocksStore.loading);
const total = computed(() => stocksStore.total);
const timestamp = computed(() => stocksStore.timestamp);

// 分页后的股票数据
const stocks = computed(() => {
  const end = currentPage.value * pageSize;
  return stocksStore.stocks.slice(0, end);
});

// 是否还有更多股票
const hasMoreStocks = computed(() => {
  return stocks.value.length < stocksStore.stocks.length;
});

// 加载更多股票
function loadMoreStocks() {
  loadingMore.value = true;
  setTimeout(() => {
    currentPage.value++;
    loadingMore.value = false;
  }, 300);
}

// 显示股票详情
function showStockDetail(stock: any) {
  selectedStock.value = stock;
  detailVisible.value = true;
}

// 关闭股票详情
function closeDetail() {
  detailVisible.value = false;
}
</script>

<style scoped>
.stock-list-container {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.stock-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.update-time {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.stock-list {
  padding: 0.5rem;
}

.loading-container,
.empty-container {
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.load-more {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
}

@media (min-width: 768px) {
  .stock-list {
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }
  
  .stock-list-header {
    padding: 1rem 1.5rem;
  }
}
</style>