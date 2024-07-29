import { createRouter, createWebHistory } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/counter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: () => import('../views/HomeVue.vue'),
        botNavbar: () => import('../components/navbar/botNavbar.vue'),
        topNavbar: () => import('../components/navbar/topNavbar.vue')
      },
      children: [
        {
          path: '/user/login',
          name: 'login',
          component: () => import('../views/login/LoginPage.vue')
        },
        {
          path: '/data',
          name: 'data',
          component: () => import('../views/MainDate.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from) => {
  const { Loginuser } = useUserStore()
  console.log('to =' + to.name, 'from =' + from.name)
  if (!Loginuser && to.name != 'login') {
    console.log('n')
    return { name: 'login' }
  }
})

export default router
