<template>
    <main>
        <div class="container">
            <Filter @filter="filter" />
            <Maps :filter="filtered" />
        </div>
    </main>
</template>
<script setup>
    import { ref } from 'vue'
    import Filter from '@/components/Filter.vue'
    import Maps from '@/components/Maps.vue'
    let filtered = ref(null)
    function filter(e) {
        filtered.value = e
    }
</script>
