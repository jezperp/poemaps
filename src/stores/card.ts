import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCardStore = defineStore('card', () => {
    let allCards: any = ref([])
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
    return { allCards, getAllCards, getCards }
})
