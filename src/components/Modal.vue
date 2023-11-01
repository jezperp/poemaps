<template>
    <div    class="modal fade"
            :class="!userStore.user ? 'modal-xl' : null"
            id="mapModal"
            tabindex="-1"
            aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div    class="modal-body bg-black"
                        v-if="map || newMap">
                    <form   enctype="multipart/form-data"
                            @submit.prevent="newMap ? createMap() : updateMap()"
                            v-if="userStore.user">
                        <div    class="row align-items-center mb-3"
                                v-if="copyMap">
                            <div class="col col-auto pe-0 me-auto">
                                <div class="img">
                                    <label for="imageInput">
                                        <img    :src="copyMap.fields.image.stringValue"
                                                class="img-fluid img-md"
                                                :alt="`${copyMap.fields.title.stringValue} map`"
                                                v-if="copyMap.fields.image.stringValue.length" />
                                        <div    class="ratio ratio-1x1 overflow-hidden w-3rem"
                                                v-else>
                                            <div class="img-placeholder rounded-circle"></div>
                                        </div>
                                    </label>
                                    <input  type="file"
                                            name="filename"
                                            id="imageInput"
                                            data-name="image"
                                            @change="upload">
                                </div>
                            </div>
                            <div class="col col-auto pe-0">
                                <p class="m-0 smaller">level:</p>
                            </div>
                            <div class="col col-2">
                                <input  v-model="copyMap.fields.level.integerValue"
                                        type="text"
                                        class="form-control smaller m-0">
                            </div>
                            <div class="col col-auto pe-0">
                                <p class="m-0 smaller">tier:</p>
                            </div>
                            <div class="col col-2">
                                <input  v-model="copyMap.fields.tier.integerValue"
                                        type="text"
                                        class="form-control smaller m-0">
                            </div>
                        </div>
                        <div class="img">
                            <label  for="thumbInput"
                                    class="w-100">
                                <div class="ratio ratio-16x9 overflow-hidden w-100">
                                    <img    :src="copyMap.fields.thumbnail.stringValue"
                                            class="img-fluid img-center"
                                            :alt="`${copyMap.fields.title.stringValue} map`"
                                            v-if="copyMap.fields.thumbnail.stringValue.length" />
                                    <div    class="img-placeholder"
                                            v-else></div>
                                </div>
                            </label>
                            <input  type="file"
                                    name="filename"
                                    id="thumbInput"
                                    data-name="thumbnail"
                                    @change="upload">
                        </div>
                        <input  v-model="copyMap.fields.title.stringValue"
                                type="text"
                                class="form-control small"
                                placeholder="Title...">
                        <textarea   v-model="copyMap.fields.description.stringValue"
                                    class="form-control smaller"
                                    placeholder="Description..." />
                        <input  v-model="copyMap.fields.video.stringValue"
                                type="text"
                                class="form-control smaller"
                                placeholder="Youtube embed code...">
                        <div    class="ratio ratio-16x9"
                                v-if="copyMap.fields.video.stringValue">
                            <iframe :src="`//www.youtube-nocookie.com/embed/${copyMap.fields.video.stringValue}`"
                                    referrerpolicy="no-referrer-when-downgrade"
                                    allowfullscreen />
                        </div>
                        <div class="row mt-3">
                            <div class="col col-3 text-center">
                                <p class="mb-0">layout</p>
                                <input  v-model="copyMap.fields.score.arrayValue.values[0].integerValue"
                                        type="text"
                                        class="form-control smaller m-0 text-center">
                            </div>
                            <div class="col col-3 text-center">
                                <p class="mb-0">density</p>
                                <input  v-model="copyMap.fields.score.arrayValue.values[1].integerValue"
                                        type="text"
                                        class="form-control smaller m-0 text-center">
                            </div>
                            <div class="col col-3 text-center">
                                <p class="mb-0">cards</p>
                                <input  v-model="copyMap.fields.score.arrayValue.values[2].integerValue"
                                        type="text"
                                        class="form-control smaller m-0 text-center">
                            </div>
                            <div class="col col-3 text-center">
                                <p class="mb-0">boss</p>
                                <input  v-model="copyMap.fields.score.arrayValue.values[3].integerValue"
                                        type="text"
                                        class="form-control smaller m-0 text-center">
                            </div>
                        </div>
                        <button type="submit"
                                class="btn btn-dark mt-3 w-100">
                            Save
                        </button>
                    </form>
                    <div    class="ratio ratio-16x9"
                            v-else>
                        <iframe :src="`//www.youtube-nocookie.com/embed/${map.fields.video.stringValue}`"
                                allowfullscreen
                                v-if="map.fields.video.stringValue.length" />
                        <div    class="ratio ratio-16x9 overflow-hidden w-100"
                                v-else-if="map.fields.thumbnail.stringValue.length">
                            <img    :src="map.fields.thumbnail.stringValue"
                                    class="img-fluid img-center"
                                    :alt="`${map.fields.title.stringValue} map`" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, watch, onMounted } from 'vue'
    import axios from 'axios'
    import * as bootstrap from 'bootstrap'
    import { useUserStore } from '@/stores/user'
    const userStore = useUserStore()
    import { useMapStore } from '@/stores/map'
    const mapStore = useMapStore()
    const props = defineProps({
        map: {
            type: Object,
            default: null
        },
        newMap: {
            type: Boolean,
            default: false
        },
        show: {
            type: Boolean,
            default: false
        }
    })
    const emit = defineEmits(['closeModal'])
    let mapModal = ref()
    let copyMap = ref()
    function updateMap() {
        mapStore.updateMap(copyMap)
        .then(res => {
            emit('closeModal')
        })
        .catch(err => {
            console.log(err)
        })
    }
    function createMap() {
        mapStore.createMap(copyMap)
        .then(res => {
            emit('closeModal')
        })
        .catch(err => {
            console.log(err)
        })
    }
    function upload(e) {
        const file = e.target.files[0]
        const name = e.target.dataset.name
        axios.post(`https://firebasestorage.googleapis.com/v0/b/poemaps-c9dcb.appspot.com/o?`, file, {
            headers: {
                'Content-Type': file.type
            },
            params: {
                uploadType: 'media',
                name: file.name
            }
        })
        .then(res => {
            const data = res.data
            const url = `https://firebasestorage.googleapis.com/v0/b/${data.bucket}/o/${data.name}?alt=media&token=${data.downloadTokens}`
            copyMap.value.fields[name].stringValue = url
        })
        .catch(err => {
            console.log(err)
        })
    }
    onMounted(() => {
        mapModal = new bootstrap.Modal('#mapModal')
        document.getElementById('mapModal').addEventListener('hidden.bs.modal', () => {
            emit('closeModal')
        })
    })
    watch(() => props.show, (val) => {
        if(val) mapModal.show()
        else mapModal.hide()
    })
    watch(() => props.map, (val) => {
        copyMap.value = JSON.parse(JSON.stringify(val))
    })
    watch(() => props.newMap, (val) => {
        if(val) {
            copyMap.value = {
                createTime: null,
                fields: {
                    description: {stringValue: ""},
                    image: {stringValue: ""},
                    level: {integerValue: 0},
                    score: {
                        arrayValue: {
                            values: [
                                {integerValue: 0},
                                {integerValue: 0},
                                {integerValue: 0},
                                {integerValue: 0}
                            ]
                        }
                    },
                    thumbnail: {stringValue: ""},
                    tier: {integerValue: 0},
                    title: {stringValue: ""},
                    video: {stringValue: ""},
                },
                name: null,
                updateTime: null
            }
        }
    })
</script>
