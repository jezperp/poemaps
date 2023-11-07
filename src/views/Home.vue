<template>
    <main>
        <div class="container">
            <Filter @filter="filter" @view="view" />
            <Maps :filter="filtered" :view="viewed" />
        </div>
    </main>
</template>
<script setup>
    import { ref } from 'vue'
    import Filter from '@/components/Filter.vue'
    import Maps from '@/components/Maps.vue'
    let filtered = ref(null)
    let viewed = ref('cols')
    function filter(e) {
        filtered.value = e
    }
    function view(e) {
        viewed.value = e
    }
</script>
