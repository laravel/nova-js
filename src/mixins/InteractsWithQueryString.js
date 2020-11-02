import defaults from 'lodash/defaults'

export default {
    methods: {
        /**
         * Update the given query string values.
         */
        updateQueryString(value) {
            this.$router.push({ query: defaults(value, this.$route.query) })
                .catch(error => {
                    if (error.name != "NavigationDuplicated") {
                        throw error;
                    }
                });
        },
    },
}
