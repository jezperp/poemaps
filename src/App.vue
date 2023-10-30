<template>
    <Header />
    <RouterView />
    <Footer />
</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import { RouterView } from 'vue-router'
    import Footer from './components/Footer.vue'
    import Header from './components/Header.vue'
    import { useUserStore } from '@/stores/user'
    const store = useUserStore()
    const refreshToken = ref(localStorage.getItem('refreshToken'))
    function auth() {
        store.authUser(refreshToken.value)
        .catch(err => {
            console.log(err)
        })
    }
    onMounted(() => {
       if(refreshToken.value) auth()
    })
</script>
