<template>
    <div    class="modal modal-xl fade"
            id="mapModal"
            tabindex="-1"
            aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body bg-black">
                    <form v-if="user">
                        form
                    </form>
                    <div    class="ratio ratio-16x9"
                            v-else-if="map">
                        <iframe :src="map.fields.video.stringValue"
                                allowfullscreen />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, watch, onMounted } from 'vue'
    import * as bootstrap from 'bootstrap'
    const props = defineProps({
        map: {
            type: Object,
            default: null
        },
        user: {
            type: Object,
            default: null
        },
        show: {
            type: Boolean,
            default: false
        }
    })
    const emit = defineEmits(['close'])
    let mapModal = ref()
    onMounted(() => {
        mapModal = new bootstrap.Modal('#mapModal')
        document.getElementById('mapModal').addEventListener('hidden.bs.modal', () => {
            emit('close')
        })
    })
    watch(() => props.show, (val) => {
        if(val) mapModal.show()
    })
</script>
