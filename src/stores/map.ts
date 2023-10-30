import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useMapStore = defineStore('map', () => {
    let activeMap = ref()
    let allMaps: any = ref([])
    const getActiveMap = computed(() => activeMap.value)
    const getFilteredMaps = computed(filter => {
        if(filter) return allMaps.value.filter((map: any) => map.title && map.title.toLowerCase().includes(filter.toLowerCase()))
        return allMaps
    })
    async function getMaps() {
        try {
            let res = await axios.get('https://firestore.googleapis.com/v1/projects/poemaps-c9dcb/databases/(default)/documents/maps')
            const docs: any[] = res.data.documents
            docs.forEach(doc => {
                allMaps.value.push(doc)
            })
            return res
        } catch(error) {
            throw error
        }
    }
    async function getMap(id = null) {
        try {
            let res = await axios.get(`https://firestore.googleapis.com/v1/projects/poemaps-c9dcb/databases/(default)/documents/maps/${id}`)
            activeMap.value = res.data
            return res
        } catch(error) {
            throw error
        }
    }
    async function updateMap(map = null) {
        console.log(map)
    }
    function $reset() {
        activeMap.value = null
    }
    return { activeMap, allMaps, getActiveMap, getFilteredMaps, getMaps, getMap, updateMap, $reset }
})
