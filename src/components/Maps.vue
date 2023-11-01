<template>
    <div    id="maps"
            class="pt-2"
            v-if="mapStore.getAllMaps">
        <div    class="map p-3 mb-1 rounded"
                @click="getMap(map)"
                v-for="(map, mkey) in filteredMaps"
                :key="mkey">
            <div class="row align-items-center">
                <div class="col col-auto text-center">
                    <div class="img">
                        <img    :src="map.fields.image.stringValue"
                                class="img-fluid img-sm"
                                :alt="`${map.fields.title.stringValue} map`" />
                    </div>
                    <p class="small mb-0 pt-2">level: {{ map.fields.level.integerValue }}</p>
                    <p class="small mb-0">tier: {{ map.fields.tier.integerValue }}</p>
                </div>
                <div class="col">
                    <h4>{{ map.fields.title.stringValue }}</h4>
                    <p class="mb-0 truncate">{{ map.fields.description.stringValue.length ? map.fields.description.stringValue : null }}</p>
                    <div class="badges pt-2">
                        <div    class="badge me-1"
                                :class="`bg-score-${map.fields.score.arrayValue.values[0].integerValue}`">
                            layout
                        </div>
                        <div    class="badge me-1"
                                :class="`bg-score-${map.fields.score.arrayValue.values[1].integerValue}`">
                            density
                        </div>
                        <div    class="badge me-1"
                                :class="`bg-score-${map.fields.score.arrayValue.values[2].integerValue}`">
                            cards
                        </div>
                        <div    class="badge"
                                :class="`bg-score-${map.fields.score.arrayValue.values[3].integerValue}`">
                            boss
                        </div>
                    </div>
                </div>
                <div    class="col col-3 d-none d-lg-flex"
                        v-if="map.fields.thumbnail.stringValue">
                    <div class="ratio ratio-16x9 overflow-hidden">
                        <img    :src="map.fields.thumbnail.stringValue"
                                class="img-fluid img-center"
                                :alt="`${map.fields.title.stringValue} map`">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button type="submit"
            class="btn btn-dark mt-3 w-100"
            @click="newMap()"
            v-if="userStore.user">
        Create new map
    </button>
    <Modal  :map="mapStore.getActiveMap"
            :newMap="newModal"
            :show="showModal"
            @closeModal="showModal = false; newModal = false" />
</template>
<script setup>
    import { ref, computed, onMounted } from 'vue'
    import { useUserStore } from '@/stores/user'
    const userStore = useUserStore()
    import { useMapStore } from '@/stores/map'
    const mapStore = useMapStore()
    import Modal from '@/components/Modal.vue'
    const props = defineProps({
        filter: {
            type: String,
            default: null
        }
    })
    let showModal = ref(false)
    let newModal = ref(false)
    const filteredMaps = computed(() => {
        if(props.filter) return mapStore.getAllMaps.value.filter(map => map.fields.title.stringValue.toLowerCase().includes(props.filter.toLowerCase()))
        return mapStore.getAllMaps.value
    })
    function getMaps() {
        mapStore.getMaps()
        .catch(err => {
            console.log(err)
        })
    }
    function getMap(map) {
        const arr = map.name.split('/')
        const id = arr[arr.length - 1]
        mapStore.getMap(id)
        .then(() => {
            showModal.value = true
        })
        .catch(err => {
            console.log(err)
        })
    }
    function newMap() {
        newModal.value = true
        showModal.value = true
    }
    onMounted(() => {
        getMaps()
    })
</script>
