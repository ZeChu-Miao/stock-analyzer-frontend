<template>
  <footer class="app-footer">
    <div class="footer-content">
      <p>© {{ currentYear }} 股票筛选器 | 数据来源: AKShare</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.app-footer {
  background-color: #fff;
  border-top: 1px solid var(--border-color);
  padding: 0.75rem 0;
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .app-footer {
    padding: 1rem 0;
    font-size: 1rem;
  }
}
</style>