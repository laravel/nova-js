<template>
    <BaseValueMetric
        @selected="fetch"
        :title="panel.name"
        :previous="previous"
        :value="value"
        :ranges="panel.ranges"
        :selected-range-key="selectedRangeKey"
        :loading="loading"
    />
</template>

<script>
import { Minimum } from '@/util'
import BaseValueMetric from './Base/ValueMetric'

export default {
    name: 'ValueMetric',

    components: {
        BaseValueMetric,
    },

    props: {
        panel: {
            type: Object,
            required: true,
        },
        resourceName: {
            type: String,
            default: '',
        },
    },

    data: () => ({
        loading: true,
        value: 0,
        previous: 0,
        selectedRangeKey: '',
    }),

    created() {
        if (this.hasRanges) {
            this.selectedRangeKey = this.panel.ranges[0].value
        }
    },

    mounted() {
        if (this.hasRanges) {
            this.fetch(this.selectedRangeKey)
        }
    },

    methods: {
        fetch(range) {
            this.loading = true
            this.selectedRangeKey = range

            Minimum(axios.get(this.metricEndpoint, this.rangePayload)).then(
                ({
                    data: {
                        value: { value, previous },
                    },
                }) => {
                    this.value = value
                    this.previous = previous
                    this.loading = false
                }
            )
        },
    },

    computed: {
        hasRanges() {
            return this.panel.ranges.length > 0
        },

        rangePayload() {
            return this.hasRanges ? { params: { range: this.selectedRangeKey } } : {}
        },

        metricEndpoint() {
            return this.resourceName
                ? `/nova-api/${this.resourceName}/metrics/${this.panel.uriKey}`
                : `/nova-api/metrics/${this.panel.uriKey}`
        },
    },
}
</script>
