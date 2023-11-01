<template>
    <Header />
    <RouterView />
    <Footer />
</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import { RouterView } from 'vue-router'
    import Footer from './components/Footer.vue'
    import Header from './components/Header.vue'
    import { useUserStore } from '@/stores/user'
    const store = useUserStore()
    const refreshToken = ref(localStorage.getItem('refreshToken'))
    function auth() {
        store.authUser(refreshToken.value)
        .then(res => {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token
        })
        .catch(err => {
            console.log(err)
        })
    }
    onMounted(() => {
       if(refreshToken.value) auth()
    })
</script>
