<template>
    <div    id="maps"
            class="pt-2"
            v-if="store.getFilteredMaps">
        <div    class="map p-3 rounded"
                :class="{ active: store.getActiveMap && store.getActiveMap.name === map.name }"
                @click="getMap(map)"
                v-for="(map, mkey) in store.getFilteredMaps.value"
                :key="mkey">
            <div class="row align-items-center">
                <div class="col col-auto text-center">
                    <div class="img">
                        <form   id="fileForm"
                                class="hidden"
                                enctype="multipart/form-data"
                                :data-name="map.name"
                                @submit.prevent="upload"
                                v-if="userStore.getUser">
                            <label for="fileInput">
                                <img    :src="map.fields.image.stringValue"
                                        class="img-fluid img-sm"
                                        :alt="`${map.fields.title.stringValue} map`"
                                        v-if="map.fields.image.stringValue.length" />
                            </label>
                            <input type="file" name="filename" id="fileInput" @change="submitForm('fileForm')">
                            <button type="submit"></button>
                        </form>
                        <img    :src="map.fields.image.stringValue"
                                class="img-fluid img-sm"
                                :alt="`${map.fields.title.stringValue} map`"
                                v-else />
                    </div>
                    <p class="small mb-0 pt-2">level: {{ map.fields.level.integerValue }}</p>
                    <p class="small mb-0">tier: {{ map.fields.tier.integerValue }}</p>
                </div>
                <div class="col">
                    <h4>{{ map.fields.title.stringValue }}</h4>
                    <p class="mb-0 truncate">{{ map.fields.description.stringValue.length ? map.fields.description.stringValue : 'No description yet...' }}</p>
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
    <Modal  :id="userStore.getUser ? 'editMapModal' : 'mapModal'"
            :map="store.getActiveMap"
            :user="userStore.getUser ? userStore.getUser : null"
            :show="showModal"
            @close="showModal = false" />
</template>
<script setup>
    import { ref, computed, onMounted } from 'vue'
    import axios from 'axios'
    import * as bootstrap from 'bootstrap'
    import { useUserStore } from '@/stores/user'
    const userStore = useUserStore()
    import { useMapStore } from '@/stores/map'
    const store = useMapStore()
    import Modal from '@/components/Modal.vue'
    const props = defineProps({
        filter: {
            type: String,
            default: null
        }
    })
    let showModal = ref(false)
    function getMaps() {
        store.getMaps()
        .catch(err => {
            console.log(err)
        })
    }
    function getMap(map) {
        const arr = map.name.split('/')
        const id = arr[arr.length - 1]
        store.getMap(id)
        .then(() => {
            showModal.value = true
        })
        .catch(err => {
            console.log(err)
        })
    }
    function submitForm(id) {
        const form = document.getElementById(id)
        form.requestSubmit()
    }
    function upload(e) {
        const file = e.target[0].files[0]
        axios.post(`https://firebasestorage.googleapis.com/v0/b/poemaps-c9dcb.appspot.com/o?`, file, {
            headers: {
                'Content-Type': file.type
            },
            params: {
                uploadType: 'media',
                name: file.name
            }
        })
        .then((response) => {
            const data = response.data
            const url = `https://firebasestorage.googleapis.com/v0/b/${data.bucket}/o/${data.name}?alt=media&token=${data.downloadTokens}`
            getMap(e.target.dataset.id)
            activeMap.image = url
            updateMap(activeMap)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    function updateMap(map) {
        console.log('updateMap', map)
    }
    onMounted(() => {
        getMaps()
    })
</script>
