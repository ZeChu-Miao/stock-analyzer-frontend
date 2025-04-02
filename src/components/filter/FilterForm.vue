<template>
  <el-form 
    :model="filterForm" 
    label-position="top" 
    @submit.prevent="applyFilter"
  >
    <el-form-item label="市值上限(亿元)">
      <div class="slider-container">
        <el-slider 
          v-model="filterForm.market_cap_limit" 
          :min="10" 
          :max="500" 
          :step="10"
          class="full-width"
        />
      </div>
    </el-form-item>
    
    <el-form-item label="量比下限">
      <div class="slider-container">
        <el-slider 
          v-model="filterForm.volume_ratio" 
          :min="1" 
          :max="10" 
          :step="0.5"
          class="full-width"
        />
      </div>
    </el-form-item>
    
    <el-form-item label="换手率上限(%)">
      <div class="slider-container">
        <el-slider 
          v-model="filterForm.turnover_rate" 
          :min="1" 
          :max="20" 
          :step="1"
          class="full-width"
        />
      </div>
    </el-form-item>
    
    <!-- 其余部分保持不变 -->
    <el-form-item label="板块类型">
      <el-radio-group v-model="filterForm.board_types" class="board-types-group">
        <el-radio label="main">主板</el-radio>
        <el-radio label="gem">创业板</el-radio>
        <el-radio label="star">科创板</el-radio>
        <el-radio label="all">所有板块</el-radio>
      </el-radio-group>
    </el-form-item>
    
    <div class="form-actions">
      <el-button type="primary" @click="applyFilter" :loading="loading">
        应用筛选
      </el-button>
      <el-button @click="resetForm">重置</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useStocksStore } from '@/stores/stocks';

const emit = defineEmits(['filter-applied']);
const stocksStore = useStocksStore();
const loading = ref(false);

// 筛选表单
const filterForm = reactive({
  market_cap_limit: 100,
  volume_ratio: 2,
  turnover_rate: 10,
  board_types: 'main'
});

// 应用筛选
async function applyFilter() {
  loading.value = true;
  try {
    await stocksStore.fetchFilteredStocks(filterForm);
    ElMessage.success({
      message: `成功筛选出 ${stocksStore.total} 只符合条件的股票`,
      duration: 2000
    });
    emit('filter-applied');
  } catch (error: any) {
    ElMessage.error({
      message: error.message || '筛选股票失败',
      duration: 3000
    });
  } finally {
    loading.value = false;
  }
}

// 重置表单
function resetForm() {
  filterForm.market_cap_limit = 100;
  filterForm.volume_ratio = 2;
  filterForm.turnover_rate = 10;
  filterForm.board_types = 'main';
}
</script>

<style scoped>
/* 修改样式，移除输入框相关样式，添加滑动条容器样式 */
.slider-container {
  width: 100%;
  padding: 0 10px;
}

.full-width {
  width: 100%;
}

/* 修改滑块样式，使其更平滑 */
:deep(.el-slider__runway) {
  margin: 16px 0;
}

:deep(.el-slider__bar) {
  transition: width 0.2s ease;
}

:deep(.el-slider__button-wrapper) {
  transition: left 0.2s ease;
}

/* 其余样式保持不变 */
.board-types-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

@media (max-width: 767px) {
  .form-actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .form-actions .el-button {
    width: 100%;
  }
  
  .board-types-group {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>