<template>
    <loading-card :loading="loading">
        <h3 class="flex mb-3 text-base text-80 font-bold">
            {{ title }}
            <span class="ml-auto font-semibold text-70 text-sm">({{ formattedTotal}} total)</span>
        </h3>

        <ul class="list-reset">
            <li v-for="item in formattedItems" class="text-xs text-80 leading-normal">
                <span class="inline-block rounded-full w-2 h-2 mr-2" :style="{
                    backgroundColor: item.color
                }"/>{{ item.label }} ({{item.value}} - {{ item.value * 100 / formattedTotal }}%)
            </li>
        </ul>

        <div
            ref="chart"
            class="z-40 vertical-center rounded-b-lg ct-chart"
            style="width: 90px; height: 90px; right: 20px; bottom: 30px; top: calc(50% + 15px);"
        />
    </loading-card>
</template>

<script>
import Chartist from 'chartist'
import 'chartist/dist/chartist.min.css'

const colorForIndex = index => ['var(--primary)', '#124682', '#8f80d2', '#5fc392', '#afe9f1'][index]

export default {
    name: 'PartitionMetric',

    props: {
        loading: Boolean,
        title: String,
        chartData: Array,
    },

    data: () => ({ chartist: null }),

    watch: {
        chartData: function(newData, oldData) {
            this.renderChart()
        },
    },

    mounted() {
        this.chartist = new Chartist.Pie(this.$refs.chart, this.formattedChartData, {
            donut: true,
            donutWidth: 10,
            donutSolid: true,
            startAngle: 270,
            showLabel: false,
        })
    },

    methods: {
        renderChart() {
            this.chartist.update(this.formattedChartData)
        },
    },

    computed: {
        formattedChartData() {
            return { labels: this.formattedLabels, series: this.formattedData }
        },

        formattedItems() {
            return _(this.chartData)
                .map((item, index) => {
                    return {
                        label: item.label,
                        value: item.value,
                        color: colorForIndex(index),
                    }
                })
                .value()
        },

        formattedLabels() {
            return _(this.chartData)
                .map(item => item.label)
                .value()
        },

        formattedData() {
            return _(this.chartData)
                .map(item => item.value)
                .value()
        },

        formattedTotal() {
            return _.sumBy(this.chartData, 'value')
        },
    },
}
</script>

<style>
.ct-series-a .ct-area,
.ct-series-a .ct-slice-donut-solid,
.ct-series-a .ct-slice-pie {
    fill: var(--primary);
}

.ct-series-b .ct-area,
.ct-series-b .ct-slice-donut-solid,
.ct-series-b .ct-slice-pie {
    fill: #124682;
}

.ct-series-c .ct-area,
.ct-series-c .ct-slice-donut-solid,
.ct-series-c .ct-slice-pie {
    fill: #8f80d2;
}

.ct-series-d .ct-area,
.ct-series-d .ct-slice-donut-solid,
.ct-series-d .ct-slice-pie {
    fill: #21b978;
}

.ct-series-e .ct-area,
.ct-series-e .ct-slice-donut-solid,
.ct-series-e .ct-slice-pie {
    fill: #afe9f1;
}
</style>
