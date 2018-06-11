<template>
    <div>
        <heading class="mb-6">Overview</heading>

        <resource-panels
            v-if="panels.length > 0"
            :panels="panels"
            class="flex flex-wrap -mx-3 mb-6"
        />
    </div>
</template>

<script>
import { HasPanels } from '@/mixins'

export default {
    mixins: [HasPanels],

    computed: {
        /**
         * Get the endpoint for this dashboard's metrics.
         */
        metricsEndpoint() {
            return `/nova-api/metrics`
        },
    },
}
</script>
