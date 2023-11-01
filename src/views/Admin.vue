<template>
    <main>
        <p  class="mb-0 text-center"
            v-if="loading">loading...</p>
        <div    id="login"
                class="container p-4"
                v-else>
            <div class="row justify-content-center">
                <div class="col col-12 col-lg-6">
                    <form @submit.prevent="login">
                        <input v-model="email" type="email" name="email" placeholder="E-mail" class="form-control">
                        <input v-model="password" type="password" name="password" placeholder="Password" class="form-control">
                        <button class="btn btn-primary mt-4">
                            Submit
                        </button>
                    </form>
                    <div    class="alert alert-danger mt-3"
                            v-if="error">
                        {{ error.code }}: {{ error.message }}
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    import { useUserStore } from '@/stores/user'
    const store = useUserStore()
    let email = ref(null)
    let error = ref(null)
    let loading = ref(false)
    let password = ref(null)
    function login() {
        loading.value = true
        error.value = null
        store.loginUser(email.value, password.value)
        .then(res => {
            router.push({ name: 'home' })
        })
        .catch(err => {
            error.value = err.response.data.error
        })
        .finally(() => {
            loading.value = false
        })
    }
</script>
