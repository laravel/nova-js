export default {
    methods: {
        /**
         * Update the given query string values.
         */
        updateQueryString(value) {
            this.$router.push({ query: _.defaults(value, this.$route.query) })
        },
    },
}
