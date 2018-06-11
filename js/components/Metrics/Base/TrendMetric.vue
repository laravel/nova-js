<template>
    <loading-card :loading="loading">
        <div class="flex mb-4">
            <h3 class="w-3/5 mr-3 text-base text-80 font-bold">{{ title }}</h3>

            <select
                v-if="ranges.length > 0"
                @change="handleChange"
                class="w-2/5 h-6 text-xs no-appearance bg-40"
            >
                <option
                    v-for="option in ranges"
                    :key="option.value"
                    :value="option.value"
                    :selected="option.value == selectedRangeKey"
                >
                    {{ option.label }}
                </option>
            </select>
        </div>

        <p class="flex items-center text-4xl">{{ formattedValue }}</p>
        <p v-if="suffix" class="-mt-1 mb-4 font-bold text-80">{{ formattedSuffix }}</p>

        <div
            ref="chart"
            class="z-40 absolute pin rounded-b-lg ct-chart"
            style="top: 60%"
        />
    </loading-card>
</template>

<script>
import _ from 'lodash'
import Chartist from 'chartist'
import 'chartist-plugin-tooltips'
import 'chartist/dist/chartist.min.css'
import { Inflector } from '@/util'
import 'chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css'

const getLabelForValue = (value, vm) => {
    const { labels, series } = vm.chartData
    return labels[_.findIndex(series[0], item => item == value)]
}

const singularOrPlural = (value, suffix) => {
    if (value > 1 || value == 0) return Inflector.pluralize(suffix)
    return Inflector.singularize(suffix)
}

export default {
    name: 'BaseTrendMetric',

    props: {
        loading: Boolean,
        title: {},
        value: {},
        chartData: {},
        prefix: '',
        suffix: '',
        ranges: { type: Array, default: () => [] },
        selectedRangeKey: String,
    },

    data: () => ({ chartist: null }),

    watch: {
        selectedRangeKey: function(newRange, oldRange) {
            this.renderChart()
        },

        chartData: function(newData, oldData) {
            this.renderChart()
        },
    },

    mounted() {
        this.chartist = new Chartist.Line(this.$refs.chart, this.chartData, {
            lineSmooth: Chartist.Interpolation.none(),
            fullWidth: true,
            showPoint: true,
            showLine: true,
            showArea: true,
            chartPadding: {
                top: 10,
                right: 0,
                bottom: 0,
                left: 0,
            },
            low: 0,
            axisX: {
                showGrid: false,
                showLabel: true,
                offset: 0,
            },
            axisY: {
                showGrid: false,
                showLabel: true,
                offset: 0,
            },
            plugins: [
                Chartist.plugins.tooltip({
                    anchorToPoint: true,
                    transformTooltipTextFnc: value => {
                        let label = getLabelForValue(value, this)

                        if (this.prefix) {
                            return `${label}: ${this.prefix}${value}`
                        }

                        if (this.suffix) {
                            const suffix = singularOrPlural(value, this.suffix)
                            return `${label}: ${value} ${suffix}`
                        }

                        return `${label}: ${value}`
                    },
                }),
            ],
        })
    },

    methods: {
        renderChart() {
            this.chartist.update(this.chartData)
        },

        handleChange(event) {
            this.$emit('selected', event.target.value)
        },
    },

    computed: {
        isNullValue() {
            return this.value == null
        },

        formattedValue() {
            return this.isNullValue ? '' : `${this.prefix}${this.value}`
        },

        formattedSuffix() {
            return singularOrPlural(this.value, this.suffix)
        },
    },
}
</script>

<style>
.full {
    top: 20%;
}

.half {
    top: 60%;
}

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
