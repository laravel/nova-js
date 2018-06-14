export default {
  data() {
    return {
      filters: [],
      currentFilters: [],
    }
  },

  methods: {
    /**
     * Initialize the current filter values from the decoded query string.
     */
    initializeFilterValuesFromQueryString() {
      this.clearAllFilters()

      if (this.encodedFilters) {
        this.currentFilters = JSON.parse(atob(this.encodedFilters))

        this.syncFilterValues()
      }
    },

    /**
     * Reset all of the current filters.
     */
    clearAllFilters() {
      this.currentFilters = []

      _.each(this.filters, filter => {
        filter.currentValue = ''
      })
    },

    /**
     * Sync the current filter values with the decoded filter query string values.
     */
    syncFilterValues() {
      _.each(this.filters, filter => {
        filter.currentValue = _.get(
          _(this.currentFilters).find(decoded => {
            return filter.class == decoded.class
          }),
          'value',
          filter.currentValue
        )
      })
    },

    /**
     * Handle a filter state change.
     */
    filterChanged() {
      this.updateQueryString({
        [this.pageParameter]: 1,
        [this.filterParameter]: btoa(JSON.stringify(this.currentFilters)),
      })
    },
  },

  computed: {
    /**
     * Get the encoded filters from the query string.
     */
    encodedFilters() {
      return this.$route.query[this.filterParameter] || ''
    },
  },
}
