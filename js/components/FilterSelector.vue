<template>
    <div>
        <filter-select v-for="filter in filters" :key="filter.name">
            <h3 slot="default" class="text-sm uppercase tracking-wide text-80 bg-30 p-3">
                {{ filter.name }}
            </h3>

            <select slot="select"
                class="block w-full form-control-sm form-select"
                v-model="filter.currentValue" @change="filterChanged(filter)"
            >
                <option value="" selected>&mdash;</option>

                <option v-for="option in filter.options" :value="option.value">
                    {{ option.name }}
                </option>
            </select>
        </filter-select>
    </div>
</template>

<script>
    export default {
        props: ['filters', 'currentFilters'],


        /**
         * Mount the component.
         */
        mounted() {
            this.current = this.currentFilters;
        },


        methods: {
            /**
             * Handle a filter selection change.
             */
            filterChanged(filter) {
                this.current = _.reject(
                    this.current, f => f.class == filter.class
                );

                if (filter.currentValue != '') {
                    this.current.push({
                        class: filter.class,
                        value: filter.currentValue
                    });
                }

                this.$emit('update:currentFilters', this.current);
                this.$emit('changed');
            },
        }
    }
</script>
