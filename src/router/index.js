import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/articles',
    name: 'Articles',
    component: () => import('@/views/Articles.vue'),
    meta: { title: '文章列表' }
  },
  {
    path: '/articles/:id',
    name: 'ArticleDetail',
    component: () => import('@/views/ArticleDetail.vue'),
    meta: { title: '文章详情' }
  },
  {
    path: '/diary',
    name: 'Diary',
    component: () => import('@/views/Diary.vue'),
    meta: { title: '日记列表' }
  },
  {
    path: '/diary/:id',
    name: 'DiaryDetail',
    component: () => import('@/views/DiaryDetail.vue'),
    meta: { title: '日记详情' }
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: () => import('@/views/Portfolio.vue'),
    meta: { title: '作品集' }
  },
  {
    path: '/portfolio/:id',
    name: 'PortfolioDetail',
    component: () => import('@/views/PortfolioDetail.vue'),
    meta: { title: '作品详情' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: { title: '关于' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
    meta: { title: '注册' }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    meta: { title: '管理后台', requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | Karin` : 'Karin | 个人博客'
  
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    if (!token) {
      next({ name: 'Login', query: { redirect: to.fullPath } })
      return
    }
    
    if (to.meta.requiresAdmin) {
      const userStore = useUserStore()
      if (!userStore.userInfo) {
        await userStore.fetchUserInfo()
      }
      
      if (userStore.userInfo?.role !== 'admin') {
        next({ name: 'Home' })
        return
      }
    }
  }
  
  next()
})

export default router
