<template>
    <div    id="maps"
            class="pt-2">
        <div    class="map p-4 rounded"
                @click="show(map)"
                v-for="(map, mkey) in filteredMaps"
                :key="mkey">
            <div class="row align-items-center">
                <div class="col col-auto text-center">
                    <img    :src="getImage(map.filename)"
                            class="img-fluid img-sm"
                            :alt="`${map.title} map`">
                    <p class="small mb-0 pt-2">level: {{ map.level }}</p>
                    <p class="small mb-0">tier: {{ map.tier }}</p>
                </div>
                <div class="col">
                    <h4>{{ map.title }}</h4>
                    <p class="mb-0 truncate">{{ map.description ? map.description : 'No description yet...' }}</p>
                    <div class="badges pt-2">
                        <div    class="badge me-1"
                                :class="`bg-${getClass(map.score.layout)}`">
                            layout
                        </div>
                        <div    class="badge me-1"
                                :class="`bg-${getClass(map.score.dense)}`">
                            density
                        </div>
                        <div    class="badge me-1"
                                :class="`bg-${getClass(map.score.div)}`">
                            cards
                        </div>
                        <div    class="badge"
                                :class="`bg-${getClass(map.score.boss)}`">
                            boss
                        </div>
                    </div>
                </div>
                <div class="col col-3 d-none d-lg-flex">
                    <img    :src="map.image"
                            class="img-fluid"
                            :alt="`${map.title} map`"
                            v-if="map.image">
                </div>
            </div>
        </div>
    </div>
    <div    class="modal fade"
            id="mapModal"
            tabindex="-1"
            aria-labelledby="mapModalLabel"
            aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-body bg-black">
                <p>{{ activeMap }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, computed } from 'vue'
    import * as bootstrap from 'bootstrap'
    const props = defineProps({
        filter: {
            type: String,
            default: null
        }
    })
    let activeMap = ref(null)
    const mapsArr = ref([
        {
            title: `Academy`,
            description: `It's a large maze with lots of dead ends. It use the Library tileset. The boss arena entrance is opened with a loose candle, like the entrance to The Archives in Act 3. It's a large room with book shelves, that seals when the boss is engaged. Contains up to three additional monster packs in the corners.`,
            filename: `academy.png`,
            image: `https://i.ytimg.com/vi/bcekUWw33pM/maxresdefault.jpg`,
            video: `#video-url`,
            level: 73,
            tier: 6,
            score: {
                layout: 2,
                dense: 2,
                div: 1,
                boss: 3
            }
        },
        {
            title: `Acid Caverns`,
            description: null,
            filename: `acid-caverns.png`,
            image: null,
            video: null,
            level: 73,
            tier: 6,
            score: {
                layout: 4,
                dense: 4,
                div: 1,
                boss: 2
            }
        },
        {
            title: `Alleyways`,
            description: null,
            filename: `alleyways.png`,
            image: null,
            video: null,
            level: 72,
            tier: 5,
            score: {
                layout: 4,
                dense: 3,
                div: 3,
                boss: 5
            }
        },
        {
            title: `Basilica`,
            description: `Layout is based upon The Chamber of Innocence. The layout is cross-shaped, but very wide. Arena entrance is to one of the sides of the cross.`,
            filename: `basilica.png`,
            image: null,
            video: null,
            level: 77,
            tier: 10,
            score: {
                layout: 4,
                dense: 5,
                div: 2,
                boss: 0
            }
        }
    ])
    const filteredMaps = computed(() => {
        if(props.filter) return mapsArr.value.filter((map) => map.title && map.title.toLowerCase().includes(props.filter.toLowerCase()))
        return mapsArr.value
    })
    const getImage = (filename) => {
        return new URL(`../assets/maps/${filename}`, import.meta.url).href
    }
    const getClass = (value) => {
        if(value === 5) return 'score-5'
        if(value === 4) return 'score-4'
        if(value === 3) return 'score-3'
        if(value === 2) return 'score-2'
        if(value === 1) return 'score-1'
        return 'score-0'
    }
    const show = (map) => {
        const mapModal = new bootstrap.Modal('#mapModal')
        activeMap.value = map
        mapModal.show()
    }
</script>
