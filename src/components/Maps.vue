<template>
    <div    id="maps"
            class="pt-2"
            v-if="mapStore.getAllMaps">
        <div class="row">
            <div    class="col col-12 map py-3 mb-1 rounded"
                    :class="props.view === 'cols' ? 'col-md-6 col-lg-4 col-xl-3' : null"
                    @click="getMap(map)"
                    v-for="(map, mkey) in filteredMaps"
                    :key="mkey">
                <MapList :map="map" v-if="props.view === 'list'" />
                <MapCols :map="map" v-else />
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
            @closeModal="resetModal" />
</template>
<script setup>
    import { ref, computed, onMounted } from 'vue'
    import { useUserStore } from '@/stores/user'
    const userStore = useUserStore()
    import { useMapStore } from '@/stores/map'
    const mapStore = useMapStore()
    import { useCardStore } from '@/stores/card'
    const cardStore = useCardStore()
    import MapList from '@/components/MapList.vue'
    import MapCols from '@/components/MapCols.vue'
    import Modal from '@/components/Modal.vue'
    const props = defineProps({
        filter: {
            type: Object,
            default: null
        },
        view: {
            type: String,
            default: 'cols'
        }
    })
    let showModal = ref(false)
    let newModal = ref(false)
    const filteredMaps = computed(() => {
        if(props.filter) {
            return mapStore.getAllMaps.value.filter(
                map => map.fields.title.stringValue.toLowerCase().includes(props.filter.text.toLowerCase())
                && map.fields.score.arrayValue.values[0].integerValue >= props.filter.score[0]
                && map.fields.score.arrayValue.values[1].integerValue >= props.filter.score[1]
                && map.fields.score.arrayValue.values[2].integerValue >= props.filter.score[2]
                && map.fields.score.arrayValue.values[3].integerValue >= props.filter.score[3]
            )
        }
        return mapStore.getAllMaps.value
    })
    function getCards() {
        cardStore.getCards()
        .catch(err => {
            console.log(err)
        })
    }
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
    function resetModal() {
        showModal.value = false
        newModal.value = false
    }
    onMounted(() => {
        getMaps()
        getCards()
    })
</script>
