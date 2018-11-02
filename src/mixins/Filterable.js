import each from 'lodash/each'
import get from 'lodash/get'

export default {
  data: () => ({
    filters: [],
    currentFilters: [],
  }),

  methods: {
    /**
     * Get the filters available for the current resource.
     */
    getFilters() {
      // this.filters = []
      // this.currentFilters = []

      return Nova.request()
        .get('/nova-api/' + this.resourceName + '/filters')
        .then(response => {
          // this.filters = response.data
          // Nova.bus.filters[this.filterParameter]['filters'] = response.data
          this.initializeFilterValuesFromQueryString()
        })
    },

    /**
     * Initialize the current filter values from the decoded query string.
     */
    initializeFilterValuesFromQueryString() {
      console.log('initializing filter values from query string')
      // this.clearAllFilters()
      // if (this.encodedFilters) {
      //   this.currentFilters = JSON.parse(atob(this.encodedFilters))
      //   console.log(this.currentFilters)
      //   this.syncFilterValues()
      // }
    },

    /**
     * Clear filters and reset the resource table
     */
    clearSelectedFilters() {
      //     console.log('clearing selected filters')
      //     // Nova.$emit('clear-selected-filters')
      //     this.filterChanged()
      //     this.clearAllFilters()
      //     // this.$nextTick(() => this.filterChanged())
      //     // this.clearAllFilters()
      //     this.syncFilterValues()
    },

    /**
     * Update the currentFilters with newFilters
     */
    updateFilters(newFilters) {
      console.log('updating filters')
      this.currentFilters = newFilters
      // this.filterChanged()
    },

    /**
     * Reset all of the current filters.
     */
    clearAllFilters() {
      // this.currentFilters = []
      // each(this.filters, filter => {
      //   filter.currentValue = ''
      // })
    },

    /**
     * Sync the current filter values with the decoded filter query string values.
     */
    syncFilterValues() {
      // each(this.filters, filter => {
      //   filter.currentValue = get(
      //     _(this.currentFilters).find(decoded => {
      //       return filter.class == decoded.class
      //     }),
      //     'value',
      //     filter.currentValue
      //   )
      // })
    },

    /**
     * Handle a filter state change.
     */
    filterChanged() {
      console.log('updating query string')
      // this.updateQueryString({
      //   [this.pageParameter]: 1,
      //   [this.filterParameter]: btoa(JSON.stringify(this.currentFilters)),
      // })
    },
  },

  computed: {
    /**
     * Get the name of the filter query string variable.
     */
    filterParameter() {
      return this.resourceName + '_filter'
    },

    /**
     * Determine if there any filters for this resource
     */
    hasFilters() {
      return Boolean(this.filters.length > 0)
    },

    /**
     * Get the encoded filters from the query string.
     */
    encodedFilters() {
      // return this.$route.query[this.filterParameter] || ''
    },
  },
}
