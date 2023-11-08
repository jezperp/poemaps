<template>
    <div    id="cards"
            class="pt-2"
            v-if="cardStore.getAllCards && userStore.user">
        <input  v-model="filter"
                type="text"
                class="form-control"
                placeholder="Type to search for a card..." />
        <div class="row my-2">
            <div class="col">
                <button type="submit"
                        class="btn btn-dark w-100"
                        @click="newCard()">
                    Create new card
                </button>
            </div>
        </div>
        <div class="row">
            <div    class="col col-12 hover py-3 mb-1 rounded"
                    @click="getCard(card)"
                    v-for="(card, ckey) in filteredCards"
                    :key="ckey">
                <Card :card="card" />
            </div>
        </div>
    </div>
    <CardModal  :card="cardStore.getActiveCard"
                :newCard="newCardModal"
                :show="showCardModal"
                @closeModal="resetModals" />
</template>
<script setup>
    import { ref, computed, onMounted } from 'vue'
    import { useUserStore } from '@/stores/user'
    const userStore = useUserStore()
    import { useCardStore } from '@/stores/card'
    const cardStore = useCardStore()
    import Card from '@/components/Card.vue'
    import CardModal from '@/components/CardModal.vue'
    let showCardModal = ref(false)
    let newCardModal = ref(false)
    let filter = ref(null)
    const filteredCards = computed(() => {
        if(filter.value) return cardStore.getAllCards.value.filter(card => card.fields.title.stringValue.toLowerCase().includes(filter.value.toLowerCase()))
        return cardStore.getAllCards.value
    })
    function getCards() {
        cardStore.getCards()
        .catch(err => {
            console.log(err)
        })
    }
    function getCard(card) {
        const arr = card.name.split('/')
        const id = arr[arr.length - 1]
        cardStore.getCard(id)
        .then(() => {
            showCardModal.value = true
        })
        .catch(err => {
            console.log(err)
        })
    }
    function newCard() {
        newCardModal.value = true
        showCardModal.value = true
    }
    function resetModals() {
        showCardModal.value = false
        newCardModal.value = false
    }
    onMounted(() => {
        getCards()
    })
</script>
