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
      sourcemap: true,
      // 调整警告阈值为 800kB
      chunkSizeWarningLimit: 800,
      
      rollupOptions: {
        output: {
          // 手动拆分代码块
          manualChunks: false
        }
      }
    }
  }
})
