import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 按需导入 Element Plus 组件
import {
  ElButton,
  ElCard,
  ElForm,
  ElFormItem,
  ElSlider,
  ElRadio,
  ElRadioGroup,
  ElSelect,
  ElOption,
  ElMessage,
  ElSkeleton,
  ElEmpty,
  ElDrawer,
  ElBacktop,
  ElInputNumber // 新增：输入数字组件
} from 'element-plus'
import 'element-plus/dist/index.css'

// 按需导入图标
import { 
  Filter, 
  Close, 
  Star, 
  Share, 
  DataAnalysis 
} from '@element-plus/icons-vue'

const app = createApp(App)
const pinia = createPinia()

// 注册需要的组件
const components = [
  ElButton,
  ElCard,
  ElForm,
  ElFormItem,
  ElSlider,
  ElRadio,
  ElRadioGroup,
  ElSelect,
  ElOption,
  ElSkeleton,
  ElEmpty,
  ElDrawer,
  ElBacktop,
  ElInputNumber // 新增：注册输入数字组件
]

components.forEach(component => {
  app.component(component.name!, component)
})

// 注册需要的图标
app.component('ElIconFilter', Filter)
app.component('ElIconClose', Close)
app.component('ElIconStar', Star)
app.component('ElIconShare', Share)
app.component('ElIconDataAnalysis', DataAnalysis)

// 全局属性
app.config.globalProperties.$message = ElMessage

app.use(pinia)
app.use(router)

app.mount('#app')
