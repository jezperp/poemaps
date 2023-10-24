<template>
    <main>
        <div class="container px-4">
            <div class="row align-items-center">
                <div class="col">
                    <input  v-model="filtered"
                            type="text"
                            class="form-control"
                            placeholder="Type to search for a map...">
                </div>
            </div>
        </div>
        <div class="container px-3">
            <Maps :filter="filtered" />
        </div>
    </main>
</template>
<script setup>
    import { ref } from 'vue'
    import Maps from '@/components/Maps.vue'
    let filtered = ref(null)
</script>
