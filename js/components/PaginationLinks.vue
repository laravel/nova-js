<template>
    <div class="bg-20 rounded-b">
        <nav v-if="resources.length > 0" class="flex">
            <!-- Previous Link -->
            <button
                :disabled="!hasPreviousPages"
                class="btn btn-link text-80 hover:text-primary py-3 px-4"
                :class="{'opacity-50': !hasPreviousPages}"
                rel="prev"
                @click.prevent="selectPreviousPage()"
            >
                Previous
            </button>

            <!-- Next Link -->
            <button
                :disabled="!hasMorePages"
                class="ml-auto btn btn-link text-80 hover:text-primary py-3 px-4"
                :class="{'opacity-50': !hasMorePages}"
                rel="next"
                @click.prevent="selectNextPage()"
            >
                Next
            </button>
        </nav>
    </div>
</template>

<script>
export default {
    props: ['resources', 'resourceResponse'],

    methods: {
        /**
         * Select the previous page.
         */
        selectPreviousPage() {
            this.$emit('previous')
        },

        /**
         * Select the next page.
         */
        selectNextPage() {
            this.$emit('next')
        },
    },

    computed: {
        /**
         * Determine if prior pages are available.
         */
        hasPreviousPages: function() {
            return Boolean(this.resourceResponse && this.resourceResponse.prev_page_url)
        },

        /**
         * Determine if more pages are available.
         */
        hasMorePages: function() {
            return Boolean(this.resourceResponse && this.resourceResponse.next_page_url)
        },
    },
}
</script>
