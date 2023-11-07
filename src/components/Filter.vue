<template>
    <div id="filter">
        <input  @keyup="filter"
                type="text"
                class="form-control"
                placeholder="Type to search for a map..."
                v-model="filterVal.text">
        <div class="row align-items-center">
            <div class="col col-auto pe-0">
                <a  href="#"
                    class="badge text-decoration-none"
                    :class="`bg-score-${filterVal.score[0]}`"
                    @click.prevent="changeVal(0)">
                    layout: {{ filterVal.score[0] }}
                </a>
            </div>
            <div class="col col-auto ps-1 pe-0">
                <a  href="#"
                    class="badge text-decoration-none"
                    :class="`bg-score-${filterVal.score[1]}`"
                    @click.prevent="changeVal(1)">
                    density: {{ filterVal.score[1] }}
                </a>
            </div>
            <div class="col col-auto ps-1 pe-0">
                <a  href="#"
                    class="badge text-decoration-none"
                    :class="`bg-score-${filterVal.score[2]}`"
                    @click.prevent="changeVal(2)">
                    cards: {{ filterVal.score[2] }}
                </a>
            </div>
            <div class="col col-auto ps-1 pe-0">
                <a  href="#"
                    class="badge text-decoration-none"
                    :class="`bg-score-${filterVal.score[3]}`"
                    @click.prevent="changeVal(3)">
                    boss: {{ filterVal.score[3] }}
                </a>
            </div>
            <div class="col col-auto ps-2 ms-auto">
                <a  href="#"
                    class="small text-decoration-none"
                    :class="viewVal === 'cols' ? 'text-primary' : 'text-white'"
                    @click.prevent="changeView('cols')">
                    columns
                </a>
                |
                <a  href="#"
                    class="small text-decoration-none"
                    :class="viewVal === 'list' ? 'text-primary' : 'text-white'"
                    @click.prevent="changeView('list')">
                    list
                </a>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, watch } from 'vue'
    const filterVal = ref({
        text: '',
        score: [0, 0, 0, 0]
    })
    const viewVal = ref('cols')
    const emit = defineEmits(['filter', 'view'])
    function filter() {
        emit('filter', {
            text: filterVal.value.text,
            score: filterVal.value.score
        })
    }
    function changeVal(i) {
        let val = filterVal.value.score[i]
        if(val === 5) val = 0
        else val++
        filterVal.value.score[i] = val
    }
    function changeView(view) {
        viewVal.value = view
        emit('view', viewVal.value)
    }
    watch(() => filterVal.value.score[0], () => {
        filter()
    })
    watch(() => filterVal.value.score[1], () => {
        filter()
    })
    watch(() => filterVal.value.score[2], () => {
        filter()
    })
    watch(() => filterVal.value.score[3], () => {
        filter()
    })
</script>
