<template>
    <div    class="modal fade"
            id="cardModal"
            tabindex="-1"
            aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div    class="modal-body bg-black"
                        v-if="copyCard || newCard">
                    <form   enctype="multipart/form-data"
                            @submit.prevent="newCard ? createCard() : updateCard()">
                        <input  v-model="copyCard.fields.title.stringValue"
                                type="text"
                                class="form-control small"
                                placeholder="Title..." />
                        <input  v-model="copyCard.fields.link.stringValue"
                                type="text"
                                class="form-control small"
                                placeholder="Link..." />
                        <input  v-model="copyCard.fields.item_title.stringValue"
                                type="text"
                                class="form-control small"
                                placeholder="Item title..." />
                        <input  v-model="copyCard.fields.item_link.stringValue"
                                type="text"
                                class="form-control small"
                                placeholder="Item link..." />
                        <input  v-model="copyCard.fields.stack.integerValue"
                                type="number"
                                min="1"
                                max="99"
                                class="form-control small"
                                placeholder="Stack..." />
                        <button type="submit"
                                class="btn btn-dark mt-3 w-100">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, computed, watch, onMounted } from 'vue'
    import * as bootstrap from 'bootstrap'
    import { useUserStore } from '@/stores/user'
    const userStore = useUserStore()
    import { useCardStore } from '@/stores/card'
    const cardStore = useCardStore()
    const props = defineProps({
        card: {
            type: Object,
            default: null
        },
        newCard: {
            type: Boolean,
            default: false
        },
        show: {
            type: Boolean,
            default: false
        }
    })
    const emit = defineEmits(['closeModal'])
    let cardModal = ref()
    let copyCard = ref()
    function updateCard() {
        cardStore.updateCard(copyCard.value)
        .then(() => {
            emit('closeModal')
        })
        .catch(err => {
            console.log(err)
        })
    }
    function createCard() {
        cardStore.createCard(copyCard)
        .then(() => {
            emit('closeModal')
        })
        .catch(err => {
            console.log(err)
        })
    }
    onMounted(() => {
        cardModal = new bootstrap.Modal('#cardModal')
        document.getElementById('cardModal').addEventListener('hidden.bs.modal', () => {
            cardStore.$reset()
            emit('closeModal')
        })
    })
    watch(() => props.show, (val) => {
        if(val) cardModal.show()
        else cardModal.hide()
    })
    watch(() => props.card, (val) => {
        copyCard.value = JSON.parse(JSON.stringify(val))
    })
    watch(() => props.newCard, (val) => {
        if(val) {
            copyCard.value = {
                fields: {
                    item_link: {stringValue: ""},
                    item_title: {stringValue: ""},
                    link: {stringValue: ""},
                    stack: {integerValue: 0},
                    title: {stringValue: ""}
                },
                name: null
            }
        }
    })
</script>
