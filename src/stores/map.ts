import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useMapStore = defineStore('map', () => {
    let activeMap = ref()
    let allMaps: any = ref([])
    const getActiveMap = computed(() => activeMap.value)
    const getAllMaps = computed(() => {
        allMaps.value.sort((a: any, b: any) => {
            if(a.fields.title.stringValue < b.fields.title.stringValue) return -1
            if(a.fields.title.stringValue > b.fields.title.stringValue) return 1
            return 0
        })
        return allMaps
    })
    async function getMaps() {
        try {
            let res = await axios.get('maps?pageSize=300')
            const docs: any[] = res.data.documents
            docs.forEach(doc => {
                allMaps.value.push(doc)
            })
            return res
        } catch(error) {
            throw error
        }
    }
    async function getMap(id: any) {
        try {
            let res = await axios.get(`maps/${id}`)
            activeMap.value = res.data
            return res
        } catch(error) {
            throw error
        }
    }
    async function updateMap(map: any) {
        const arr = map.name.split('/')
        const id = arr[arr.length - 1]
        try {
            let res = await axios.patch(`maps/${id}`, map)
            let arrMap: any = allMaps.value.find((map: any) => map.name === res.data.name)
            arrMap.fields = JSON.parse(JSON.stringify(res.data.fields))
            return res
        } catch(error) {
            throw error
        }
    }
    async function createMap(map: any) {
        try {
            let res = await axios.post(`maps`, map.value)
            allMaps.value.push(res.data)
            return res
        } catch(error) {
            throw error
        }
    }
    function $reset() {
        activeMap.value = null
    }
    return { activeMap, allMaps, getActiveMap, getAllMaps, getMaps, getMap, updateMap, createMap, $reset }
})
