import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCardStore = defineStore('card', () => {
    let activeCard = ref()
    let allCards: any = ref([])
    const getActiveCard = computed(() => activeCard.value)
    const getAllCards = computed(() => {
        allCards.value.sort((a: any, b: any) => {
            if(a.fields.title.stringValue < b.fields.title.stringValue) return -1
            if(a.fields.title.stringValue > b.fields.title.stringValue) return 1
            return 0
        })
        return allCards
    })
    async function getCards() {
        try {
            let res = await axios.get('cards?pageSize=300')
            const docs: any[] = res.data.documents
            docs.forEach(doc => {
                allCards.value.push(doc)
            })
            return res
        } catch(error) {
            throw error
        }
    }
    async function getCard(id: any) {
        try {
            let res = await axios.get(`cards/${id}`)
            activeCard.value = res.data
            return res
        } catch(error) {
            throw error
        }
    }
    async function updateCard(card: any) {
        const arr = card.name.split('/')
        const id = arr[arr.length - 1]
        try {
            let res = await axios.patch(`cards/${id}`, card)
            let arrCard: any = allCards.value.find((card: any) => card.name === res.data.name)
            arrCard.fields = JSON.parse(JSON.stringify(res.data.fields))
            return res
        } catch(error) {
            throw error
        }
    }
    async function createCard(card: any) {
        try {
            let res = await axios.post(`cards`, card.value)
            allCards.value.push(res.data)
            return res
        } catch(error) {
            throw error
        }
    }
    function $reset() {
        activeCard.value = null
    }
    return { activeCard, allCards, getActiveCard, getAllCards, getCards, getCard, updateCard, createCard, $reset }
})
