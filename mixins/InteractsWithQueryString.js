import defaults from 'lodash/defaults'

export const InteractsWithQueryString = {
    methods: {
        /**
         * Update the given query string values.
         */
        updateQueryString(value) {
            this.$router.push({ query: defaults(value, this.$route.query) })
        },
    },
}
