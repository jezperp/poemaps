<template>
    <div class="row align-items-center">
        <div class="col col-auto text-center">
            <div class="img">
                <img    :src="props.map.fields.image.stringValue"
                        class="img-fluid img-sm" />
            </div>
            <p class="small mb-0 pt-2">level: {{ props.map.fields.level.integerValue }}</p>
            <p class="small mb-0">tier: {{ props.map.fields.tier.integerValue }}</p>
        </div>
        <div class="col">
            <h4>{{ props.map.fields.title.stringValue }}</h4>
            <p class="mb-0 truncate">{{ props.map.fields.description.stringValue }}</p>
            <div class="badges pt-2">
                <div    class="badge me-1"
                        :class="`bg-score-${props.map.fields.score.arrayValue.values[0].integerValue}`">
                    layout: {{ props.map.fields.score.arrayValue.values[0].integerValue }}
                </div>
                <div    class="badge me-1"
                        :class="`bg-score-${props.map.fields.score.arrayValue.values[1].integerValue}`">
                    density: {{ props.map.fields.score.arrayValue.values[1].integerValue }}
                </div>
                <div    class="badge me-1"
                        :class="`bg-score-${props.map.fields.score.arrayValue.values[2].integerValue}`">
                    cards: {{ props.map.fields.score.arrayValue.values[2].integerValue }}
                </div>
                <div    class="badge"
                        :class="`bg-score-${props.map.fields.score.arrayValue.values[3].integerValue}`">
                    boss: {{ props.map.fields.score.arrayValue.values[3].integerValue }}
                </div>
            </div>
        </div>
        <div class="col col-3 d-none d-lg-flex">
            <div class="ratio ratio-16x9 overflow-hidden">
                <img    :src="`https://i.ytimg.com/vi/${props.map.fields.id.stringValue}/maxresdefault.jpg`"
                        class="img-fluid img-center" />
            </div>
        </div>
    </div>
</template>
<script setup>
    const props = defineProps({
        map: {
            type: Object,
            default: null
        }
    })
</script>
