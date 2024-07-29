import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const username = ref(null)
  const password = ref(null)
  const userList = [
    {
      name: 'Andy',
      username: 'AAA',
      password: 'aaa'
    },
    {
      name: 'Bob',
      username: 'BBB',
      password: 'bbb'
    },
    {
      name: 'Cindy',
      username: 'CCC',
      password: 'ccc'
    }
  ]

  const Loginuser = ref(
    computed(() => {
      const user = userList.find(
        (check) => check.username == username.value && check.password == password.value
      )
      return user
    })
  )

  function userlogin(un, pw) {
    username.value = un
    password.value = pw
  }

  return { Loginuser, userlogin }
})
