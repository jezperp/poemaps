<template>
    <div class="row align-items-center">
        <div class="col">
            <a  :href="props.card.fields.link.stringValue"
                class="text-primary text-decoration-none lead"
                target="_blank"
                v-if="props.card.fields.link.stringValue.length">
                {{ props.card.fields.title.stringValue }}
            </a>
            <p  class="m-0 text-primary d-inline-block lead"
                v-else>
                {{ props.card.fields.title.stringValue }}
            </p>
            ({{ props.card.fields.stack.integerValue }})
            <a  :href="props.card.fields.item_link.stringValue"
                class="text-secondary text-decoration-none"
                target="_blank"
                v-if="props.card.fields.item_link.stringValue.length">
                {{ props.card.fields.item_title.stringValue }}
            </a>
            <p  class="m-0 text-secondary d-inline-block"
                v-else>
                {{ props.card.fields.item_title.stringValue }}
            </p>
        </div>
    </div>
</template>
<script setup>
    const props = defineProps({
        card: {
            type: Object,
            default: null
        }
    })
</script>
