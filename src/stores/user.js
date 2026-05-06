import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login, register, logout, getUserInfo, uploadAvatar } from '@/api/auth'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(null)
  const isLoggedIn = computed(() => !!token.value)

  async function loginAction(credentials) {
    try {
      const res = await login(credentials)
      token.value = res.data.token
      userInfo.value = res.data.user
      localStorage.setItem('token', res.data.token)
      return res
    } catch (error) {
      throw error
    }
  }

  async function registerAction(userData) {
    try {
      const res = await register(userData)
      return res
    } catch (error) {
      throw error
    }
  }

  async function logoutAction() {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      token.value = ''
      userInfo.value = null
      localStorage.removeItem('token')
    }
  }

  async function fetchUserInfo() {
    if (!token.value) return
    try {
      const res = await getUserInfo()
      userInfo.value = res.data
      return res.data
    } catch (error) {
      token.value = ''
      localStorage.removeItem('token')
      throw error
    }
  }

  async function updateAvatarAction(file) {
    try {
      const res = await uploadAvatar(file)
      if (userInfo.value) {
        userInfo.value.avatar = res.data.url
      }
      return res
    } catch (error) {
      throw error
    }
  }

  function initUser() {
    if (token.value) {
      fetchUserInfo().catch(() => {
        console.error('Failed to fetch user info')
      })
    }
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    loginAction,
    registerAction,
    logoutAction,
    fetchUserInfo,
    updateAvatarAction,
    initUser
  }
})
