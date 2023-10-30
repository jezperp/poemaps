import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
    const user = ref()
    const getUser = computed(() => user.value)
    async function authUser(token = null) {
        try {
            let res = await axios.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyA4ABbinNKQychF23twNHXjs1SMURVq1vw', {
                grant_type: 'refresh_token',
                refresh_token: token
            })
            user.value = res.data
            return res
        } catch(error) {
            throw error
        }
    }
    async function loginUser(email = null, password = null) {
        try {
            let res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4ABbinNKQychF23twNHXjs1SMURVq1vw', {
                email: email,
                password: password,
                returnSecureToken: true
            })
            localStorage.setItem('refreshToken', res.data.refreshToken)
            return res
        } catch(error) {
            throw error
        }
    }
    async function updateUser() {
        console.log(user)
    }
    function $reset() {
        user.value = null
    }
    return { user, getUser, authUser, loginUser, updateUser, $reset }
})
