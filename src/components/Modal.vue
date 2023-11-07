<template>
    <div    class="modal fade"
            :class="!userStore.user ? 'modal-xl' : null"
            id="mapModal"
            tabindex="-1"
            aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div    class="modal-body bg-black"
                        v-if="copyMap || newMap">
                    <form   enctype="multipart/form-data"
                            @submit.prevent="newMap ? createMap() : updateMap()"
                            v-if="userStore.user">
                        <div    class="row align-items-center"
                                v-if="copyMap">
                            <div class="col col-auto pe-0 me-auto">
                                <div class="img">
                                    <img    :src="copyMap.fields.image.stringValue"
                                            class="img-fluid img-md"
                                            v-if="copyMap.fields.image.stringValue.length" />
                                    <div    class="ratio ratio-1x1 overflow-hidden w-3rem"
                                            v-else>
                                        <div class="img-placeholder rounded-circle"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col col-auto pe-0">
                                <p class="m-0 small">level:</p>
                            </div>
                            <div class="col col-2">
                                <input  v-model="copyMap.fields.level.integerValue"
                                        type="text"
                                        class="form-control smaller m-0">
                            </div>
                            <div class="col col-auto pe-0">
                                <p class="m-0 small">tier:</p>
                            </div>
                            <div class="col col-2">
                                <input  v-model="copyMap.fields.tier.integerValue"
                                        type="text"
                                        class="form-control smaller m-0">
                            </div>
                        </div>
                        <input  v-model="copyMap.fields.image.stringValue"
                                type="text"
                                class="form-control small"
                                placeholder="Map image url...">
                        <div    class="img"
                                v-if="copyMap.fields.id">
                            <div class="ratio ratio-16x9 overflow-hidden w-100">
                                <img    :src="`https://i.ytimg.com/vi/${copyMap.fields.id.stringValue}/maxresdefault.jpg`"
                                        class="img-fluid img-center"
                                        :alt="`${copyMap.fields.title.stringValue} map`"
                                        v-if="copyMap.fields.id.stringValue.length" />
                                <div    class="img-placeholder"
                                        v-else />
                            </div>
                        </div>
                        <input  v-model="copyMap.fields.id.stringValue"
                                type="text"
                                class="form-control small mt-3"
                                placeholder="Youtube video id..." />
                        <input  v-model="copyMap.fields.title.stringValue"
                                type="text"
                                class="form-control small"
                                placeholder="Title..." />
                        <textarea   v-model="copyMap.fields.description.stringValue"
                                    class="form-control small"
                                    placeholder="Description..." />
                        <div class="ratio ratio-16x9">
                            <iframe :src="`//www.youtube-nocookie.com/embed/${copyMap.fields.id.stringValue}`"
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
                        <select class="form-control smaller mb-0 mt-3"
                                @change="addCard($event)">
                            <option selected>Add card...</option>
                            <option :value="getId(card)"
                                    v-for="(card, ckey) in filteredCards"
                                    :key="ckey">
                                {{ card.fields.title.stringValue }}
                            </option>
                        </select>
                        <div    class="cards pt-3 pb-3"
                                v-if="copyMap.fields.cards">
                            <div    class="card"
                                    v-for="(card, ckey) in copyMap.fields.cards.arrayValue.values"
                                    :key="ckey">
                                <div class="row">
                                    <div class="col">
                                        <a  :href="getCard(card).fields.link.stringValue"
                                            target="_blank"
                                            class="text-primary text-decoration-none">
                                            {{ getCard(card).fields.title.stringValue }}
                                        </a>
                                        ({{ getCard(card).fields.stack.integerValue }})
                                    </div>
                                    <div class="col col-auto">
                                        <a  href="#"
                                            class="text-danger text-decoration-none"
                                            @click.prevent="removeCard(card)">
                                            x
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit"
                                class="btn btn-dark mt-3 w-100">
                            Save
                        </button>
                    </form>
                    <div v-else>
                        <div class="ratio ratio-16x9">
                            <iframe :src="`//www.youtube-nocookie.com/embed/${copyMap.fields.id.stringValue}`"
                                    allowfullscreen />
                        </div>
                        <div    class="cards pt-4"
                                v-if="copyMap.fields.cards">
                            <h5>Cards</h5>
                            <div    class="card"
                                    v-for="(card, ckey) in copyMap.fields.cards.arrayValue.values"
                                    :key="ckey">
                                <a  :href="getCard(card).fields.link.stringValue"
                                    target="_blank"
                                    class="text-primary">
                                    {{ getCard(card).fields.title.stringValue }}
                                </a>
                                ({{ getCard(card).fields.stack.integerValue }})
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, computed, watch, onMounted } from 'vue'
    import axios from 'axios'
    import * as bootstrap from 'bootstrap'
    import { useUserStore } from '@/stores/user'
    const userStore = useUserStore()
    import { useMapStore } from '@/stores/map'
    const mapStore = useMapStore()
    import { useCardStore } from '@/stores/card'
    const cardStore = useCardStore()
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
    const filteredCards = computed(() => {
        if(copyMap.value.fields.cards && copyMap.value.fields.cards.arrayValue && copyMap.value.fields.cards.arrayValue.values) {
            let cardsFilter = copyMap.value.fields.cards.arrayValue.values.map(card => { return card.stringValue })
            return cardStore.getAllCards.value.filter(card => !cardsFilter.includes(getId(card)))
        } else {
            return cardStore.getAllCards.value
        }
    })
    function updateMap() {
        mapStore.updateMap(copyMap.value)
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
    function getCard(card) {
        let cardItem
        cardStore.getAllCards.value.forEach(citem => {
            const arr = citem.name.split('/')
            const id = arr[arr.length - 1]
            if(id == card.stringValue) cardItem = citem
        })
        return cardItem
    }
    function addCard(e) {
        const noval = !copyMap.value.fields.cards || copyMap.value.fields.cards && !copyMap.value.fields.cards.arrayValue || copyMap.value.fields.cards && copyMap.value.fields.cards.arrayValue && !copyMap.value.fields.cards.arrayValue.values
        if(noval) copyMap.value.fields.cards = { arrayValue: { values: [] }}
        copyMap.value.fields.cards.arrayValue.values.push({ stringValue: e.target.value })
    }
    function removeCard(card) {
        let arr = copyMap.value.fields.cards.arrayValue.values
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].stringValue === card.stringValue) {
                arr.splice(i, 1)
            }
        }
        copyMap.value.fields.cards.arrayValue.values = arr
    }
    function getId(item) {
        const arr = item.name.split('/')
        const id = arr[arr.length - 1]
        return id
    }
    onMounted(() => {
        mapModal = new bootstrap.Modal('#mapModal')
        document.getElementById('mapModal').addEventListener('hidden.bs.modal', () => {
            mapStore.$reset()
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
                fields: {
                    description: {stringValue: ""},
                    id: {stringValue: ""},
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
                    tier: {integerValue: 0},
                    title: {stringValue: ""}
                },
                name: null
            }
        }
    })
</script>
