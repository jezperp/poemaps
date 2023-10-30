<template>
    <div id="filter">
        <div class="row align-items-center">
            <div class="col">
                <input  @keyup="filter"
                        type="text"
                        class="form-control"
                        placeholder="Type to search for a map...">
            </div>
        </div>
    </div>
</template>
<script setup>
    const emit = defineEmits(['filter'])
    function filter(e) {
        emit('filter', e.target.value)
    }
</script>
