import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import App from './App.vue'
import router from './router'
import './styles/main.css'

const app = createApp(App)

app.directive('lazy', {
  mounted(el, binding) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.src = binding.value
          el.classList.add('loaded')
          observer.unobserve(el)
        }
      })
    }, { rootMargin: '50px' })
    
    el.dataset.src = el.src
    el.src = ''
    el.classList.add('lazy-loading')
    observer.observe(el)
  }
})

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')
