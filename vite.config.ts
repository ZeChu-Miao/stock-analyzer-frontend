import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd())
  
  return {
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      // 调整警告阈值为 800kB
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
  }
})
