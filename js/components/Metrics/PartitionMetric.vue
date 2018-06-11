<template>
    <BasePartitionMetric
        :title="panel.name"
        :chart-data="chartData"
        :loading="loading"
    />
</template>

<script>
import { Minimum } from '@/util'
import BasePartitionMetric from './Base/PartitionMetric'

export default {
    components: {
        BasePartitionMetric,
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
        chartData: [],
    }),

    mounted() {
        this.fetch()
    },

    methods: {
        fetch() {
            this.loading = true

            Minimum(axios.get(`/nova-api/${this.resourceName}/metrics/${this.panel.uriKey}`)).then(
                ({
                    data: {
                        value: { value },
                    },
                }) => {
                    this.chartData = value
                    this.loading = false
                }
            )
        },
    },
}
</script>
