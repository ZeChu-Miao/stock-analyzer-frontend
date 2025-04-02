import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // 调整警告阈值为 800kB (如果只想消除警告而不做实际优化可以用这个)
    chunkSizeWarningLimit: 800,
    
    rollupOptions: {
      output: {
        // 手动拆分代码块
        manualChunks: {
          // 将 Element Plus 拆分为单独的块
          'element-plus': ['element-plus'],
          // 将所有 node_modules 中的依赖拆分为单独的块
          vendor: ['vue', 'vue-router', 'pinia', 'axios'],
          // 将图表库单独拆分
          'chart-vendor': ['echarts']
        }
      }
    }
  }
})
