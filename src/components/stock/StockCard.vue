<template>
  <div class="stock-card" @click="$emit('click', stock)">
    <div class="stock-header">
      <div class="stock-name">{{ stock.名称 }}</div>
      <div class="stock-code">{{ stock.代码 }}</div>
    </div>
    
    <div class="stock-price">
      <div class="current-price">{{ formatPrice(stock.最新价) }}</div>
      <div 
        class="price-change" 
        :class="stock.涨跌幅 >= 0 ? 'price-up' : 'price-down'"
      >
        {{ formatPercentage(stock.涨跌幅) }}
      </div>
    </div>
    
    <div class="stock-metrics">
      <div class="metric">
        <span class="metric-label">市值</span>
        <span class="metric-value">{{ formatMarketCap(stock.总市值) }}</span>
      </div>
      <div class="metric">
        <span class="metric-label">量比</span>
        <span class="metric-value">{{ formatNumber(stock.量比) }}</span>
      </div>
      <div class="metric">
        <span class="metric-label">换手率</span>
        <span class="metric-value">{{ formatPercentage(stock.换手率) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  stock: {
    type: Object,
    required: true
  }
});

defineEmits(['click']);

// 格式化价格
function formatPrice(price: number) {
  return price.toFixed(2);
}

// 格式化百分比
function formatPercentage(value: number) {
  return `${value.toFixed(2)}%`;
}

// 格式化市值
function formatMarketCap(value: number) {
  const billion = value / 100000000;
  return billion >= 1 
    ? `${billion.toFixed(2)}亿` 
    : `${(billion * 10).toFixed(2)}千万`;
}

// 格式化数字
function formatNumber(value: number) {
  return value.toFixed(2);
}
</script>

<style scoped>
.stock-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.stock-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stock-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.stock-name {
  font-weight: 600;
  font-size: 1.1rem;
}

.stock-code {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.stock-price {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1rem;
}

.current-price {
  font-size: 1.5rem;
  font-weight: 700;
}

.price-change {
  font-weight: 600;
}

.price-up {
  color: var(--danger-color);
}

.price-down {
  color: var(--success-color);
}

.stock-metrics {
  display: flex;
  justify-content: space-between;
}

.metric {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.metric-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.metric-value {
  font-weight: 600;
}

@media (min-width: 768px) {
  .stock-card {
    margin-bottom: 0;
  }
}
</style>