<template>
    <div v-if="panels.length > 0">
        <div
            v-for="panel in panels"
            class="px-3 w-1/3 mb-6"
            :key="`${panel.type}.${panel.name}`"
        >
            <component
                class="metric"
                :is="`${panel.type}-metric`"
                :panel="panel"
                :resourceName="resourceName"
            />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        panels: Array,
        resourceName: String,
    },
}
</script>
