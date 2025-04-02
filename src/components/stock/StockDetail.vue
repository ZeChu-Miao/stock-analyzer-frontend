<template>
  <el-drawer
    v-model="isVisible"
    :title="stock?.名称"
    direction="btt"
    size="80%"
    :with-header="false"
    :destroy-on-close="true"
    @close="$emit('close')"
  >
    <div class="stock-detail-container">
      <div class="stock-detail-header">
        <div class="header-left">
          <h2>{{ stock?.名称 }}</h2>
          <div class="stock-code">{{ stock?.代码 }}</div>
        </div>
        <el-button 
          icon="el-icon-close" 
          circle 
          @click="$emit('close')"
        />
      </div>
      
      <div class="price-section">
        <div class="current-price">{{ formatPrice(stock?.最新价) }}</div>
        <div 
          class="price-change" 
          :class="(stock?.涨跌幅 || 0) >= 0 ? 'price-up' : 'price-down'"
        >
          {{ formatPercentage(stock?.涨跌幅) }}
        </div>
      </div>
      
      <div class="metrics-grid">
        <div class="metric-item">
          <div class="metric-label">市值</div>
          <div class="metric-value">{{ formatMarketCap(stock?.总市值) }}</div>
        </div>
        <div class="metric-item">
          <div class="metric-label">量比</div>
          <div class="metric-value">{{ formatNumber(stock?.量比) }}</div>
        </div>
        <div class="metric-item">
          <div class="metric-label">换手率</div>
          <div class="metric-value">{{ formatPercentage(stock?.换手率) }}</div>
        </div>
        <div class="metric-item">
          <div class="metric-label">成交量</div>
          <div class="metric-value">{{ formatVolume(stock?.成交量) }}</div>
        </div>
        <div class="metric-item">
          <div class="metric-label">成交额</div>
          <div class="metric-value">{{ formatAmount(stock?.成交额) }}</div>
        </div>
        <div class="metric-item">
          <div class="metric-label">振幅</div>
          <div class="metric-value">{{ formatPercentage(stock?.振幅) }}</div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  stock: {
    type: Object,
    default: null
  },
  visible: {
    type: Boolean,
    default: false
  }
});

defineEmits(['close']);

const isVisible = computed({
  get: () => props.visible,
  set: () => {}
});

// 格式化价格
function formatPrice(price?: number) {
  return price ? price.toFixed(2) : '-';
}

// 格式化百分比
function formatPercentage(value?: number) {
  return value ? `${value.toFixed(2)}%` : '-';
}

// 格式化市值
function formatMarketCap(value?: number) {
  if (!value) return '-';
  const billion = value / 100000000;
  return billion >= 1 
    ? `${billion.toFixed(2)}亿` 
    : `${(billion * 10).toFixed(2)}千万`;
}

// 格式化数字
function formatNumber(value?: number) {
  return value ? value.toFixed(2) : '-';
}

// 格式化成交量
function formatVolume(value?: number) {
  if (!value) return '-';
  const volume = value / 100; // 转换为手
  if (volume >= 10000) {
    return `${(volume / 10000).toFixed(2)}万手`;
  }
  return `${Math.round(volume)}手`;
}

// 格式化成交额
function formatAmount(value?: number) {
  if (!value) return '-';
  if (value >= 100000000) {
    return `${(value / 100000000).toFixed(2)}亿`;
  }
  if (value >= 10000) {
    return `${(value / 10000).toFixed(2)}万`;
  }
  return `${value.toFixed(2)}`;
}
</script>

<style scoped>
.stock-detail-container {
  padding: 1rem;
}

.stock-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.header-left {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.header-left h2 {
  margin: 0;
  font-size: 1.5rem;
}

.stock-code {
  color: var(--text-secondary);
  font-size: 1rem;
}

.price-section {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.current-price {
  font-size: 2rem;
  font-weight: 700;
}

.price-change {
  font-size: 1.25rem;
  font-weight: 600;
}

.price-up {
  color: var(--danger-color);
}

.price-down {
  color: var(--success-color);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.metric-item {
  padding: 0.75rem;
  background-color: var(--background-light);
  border-radius: 4px;
}

.metric-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.metric-value {
  font-size: 1.125rem;
  font-weight: 600;
}

@media (min-width: 768px) {
  .stock-detail-container {
    padding: 1.5rem;
  }
  
  .metrics-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>