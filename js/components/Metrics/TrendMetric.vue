<template>
    <BaseTrendMetric
        @selected="handleRangeSelected"
        :title="panel.name"
        :value="value"
        :chart-data="data"
        :ranges="panel.ranges"
        :prefix="prefix"
        :suffix="suffix"
        :selected-range-key="selectedRangeKey"
        :loading="loading"
    />
</template>

<script>
import _ from 'lodash'
import { Minimum } from '@/util'
import BaseTrendMetric from './Base/TrendMetric'

export default {
    name: 'TrendMetric',

    components: {
        BaseTrendMetric,
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

    data() {
        return {
            loading: true,
            value: '',
            data: [],
            prefix: '',
            suffix: '',
            selectedRangeKey: '',
        }
    },

    mounted() {
        if (this.hasRanges) {
            this.selectedRangeKey = this.panel.ranges[0].value
        }

        this.fetch()
    },

    methods: {
        handleRangeSelected(key) {
            // this.loading = true
            this.selectedRangeKey = key
            this.fetch()
        },

        fetch() {
            this.loading = true

            Minimum(axios.get(this.metricEndpoint, this.rangePayload)).then(
                ({
                    data: {
                        value: { labels, trend, value, prefix, suffix },
                    },
                }) => {
                    this.value = value
                    this.labels = Object.keys(trend)
                    this.data = {
                        labels: Object.keys(trend),
                        series: [_.map(trend, i => i)],
                    }
                    this.prefix = prefix || ''
                    this.suffix = suffix || ''
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

<style>
.ct-series-a .ct-bar,
.ct-series-a .ct-line,
.ct-series-a .ct-point,
.ct-series-a .ct-slice-donut {
    stroke: var(--primary-70) !important;
    stroke-width: 2px;
}

.ct-series-a .ct-area,
.ct-series-a .ct-slice-donut-solid,
.ct-series-a .ct-slice-pie {
    fill: var(--primary-50) !important;
}

.ct-point {
    stroke: var(--primary) !important;
    stroke-width: 6px !important;
}
</style>
