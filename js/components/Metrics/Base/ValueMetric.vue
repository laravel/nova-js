<template>
    <loading-card :loading="loading" class="metric px-6 py-4 relative">
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

        <p class="text-4xl mb-4">{{ value }}</p>

        <div class="flex items-center">
            <p class="text-80 font-bold">
                <svg v-if="increaseOrDecreaseLabel == 'Decrease'" class="text-danger fill-current mr-2" width="20" height="12"><path d="M2 3a1 1 0 0 0-2 0v8a1 1 0 0 0 1 1h8a1 1 0 0 0 0-2H3.414L9 4.414l3.293 3.293a1 1 0 0 0 1.414 0l6-6A1 1 0 0 0 18.293.293L13 5.586 9.707 2.293a1 1 0 0 0-1.414 0L2 8.586V3z"/></svg>
                <svg v-if="increaseOrDecreaseLabel == 'Increase'" class="rotate-180 text-success fill-current mr-2" width="20" height="12"><path d="M2 3a1 1 0 0 0-2 0v8a1 1 0 0 0 1 1h8a1 1 0 0 0 0-2H3.414L9 4.414l3.293 3.293a1 1 0 0 0 1.414 0l6-6A1 1 0 0 0 18.293.293L13 5.586 9.707 2.293a1 1 0 0 0-1.414 0L2 8.586V3z"/></svg>
                <span>{{ growthPercentage }}% {{ increaseOrDecreaseLabel }}</span>
            </p>

<!--             <button @click="fetch" class="metric-refresh">
                <svg class="fill-current" width="15" height="16"><path d="M2.4 13.36v1.84a.8.8 0 1 1-1.6 0v-4a.8.8 0 0 1 .8-.8h4a.8.8 0 1 1 0 1.6H3.28a5.6 5.6 0 0 0 9.52-4 .8.8 0 1 1 1.6 0 7.2 7.2 0 0 1-12 5.36zM12 2.64V.8a.8.8 0 1 1 1.6 0v4a.8.8 0 0 1-.8.8h-4a.8.8 0 1 1 0-1.6h2.32A5.6 5.6 0 0 0 1.6 8 .8.8 0 1 1 0 8a7.2 7.2 0 0 1 12-5.36z"/></svg>
            </button>
 -->
        </div>
    </loading-card>
</template>

<script>
export default {
    name: 'BaseValueMetric',
    props: {
        loading: { default: true },
        title: {},
        previous: {},
        value: {},
        selectedRangeKey: String,
        ranges: { type: Array, default: () => [] },
    },

    methods: {
        handleChange(event) {
            this.$emit('selected', event.target.value)
        },
    },

    computed: {
        growthPercentage() {
            return Math.abs(this.increaseOrDecrease)
        },

        increaseOrDecrease() {
            if (this.previous == 0) return 100
            else if (this.value == 0) return -100

            return ((this.value - this.previous) / this.previous * 100).toFixed(2)
        },

        increaseOrDecreaseLabel() {
            switch (Math.sign(this.increaseOrDecrease)) {
                case 1:
                    return 'Increase'
                case 0:
                    return 'Constant'
                case -1:
                    return 'Decrease'
            }
        },

        sign() {
            switch (Math.sign(this.increaseOrDecrease)) {
                case 1:
                    return '+'
                case 0:
                    return ''
                case -1:
                    return '-'
            }
        },
    },
}
</script>
