<template>
  <div class="about-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>关于股票筛选工具</h2>
        </div>
      </template>
      
      <div class="about-content">
        <p>本工具是一个基于 Vue 3 和 Element Plus 开发的 A 股股票筛选应用，旨在帮助投资者快速筛选符合特定条件的股票。</p>
        
        <h3>主要功能</h3>
        <ul>
          <li>根据市值、量比、换手率等条件筛选股票</li>
          <li>支持不同板块（主板、创业板、科创板）的筛选</li>
          <li>移动端友好的响应式设计</li>
          <li>详细的股票信息展示</li>
        </ul>
        
        <h3>数据来源</h3>
        <p>本应用的股票数据通过 AKShare 获取，数据仅供参考，不构成任何投资建议。</p>
        
        <h3>免责声明</h3>
        <p>投资有风险，入市需谨慎。本工具仅提供数据筛选功能，不对投资决策负责。用户应自行承担使用本工具进行投资决策的风险。</p>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.about-content {
  line-height: 1.6;
}

.about-content h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--primary-color);
}

.about-content p {
  margin-bottom: 1rem;
}

.about-content ul {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.about-content li {
  margin-bottom: 0.5rem;
}
</style>