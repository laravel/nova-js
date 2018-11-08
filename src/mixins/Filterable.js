import each from 'lodash/each'
import get from 'lodash/get'

export default {
  methods: {
    /**
     * Clear filters and reset the resource table
     */
    async clearSelectedFilters() {
      await this.$store.dispatch('resetFilterState', this.resourceName)

      this.updateQueryString({
        [this.pageParameter]: 1,
        [this.filterParameter]: '',
      })
    },

    /**
     * Handle a filter state change.
     */
    filterChanged() {
      this.updateQueryString({
        [this.pageParameter]: 1,
        [this.filterParameter]: this.$store.getters.currentEncodedFilters,
      })
    },

    /**
     * Set up filters for the current view
     */
    async initializeFilters() {
      await this.$store.dispatch('fetchFilters', this.resourceName)
      this.initializeState()
    },

    /**
     * Set up filters for the current lens view
     */
    async initializeLensFilters(lens) {
      await this.$store.dispatch('fetchLensFilters', { resourceName: this.resourceName, lens })
      this.initializeState()
    },

    /**
     * Initialize the filter state
     */
    async initializeState() {
      if (this.initialEncodedFilters) {
        await this.$store.dispatch(
          'initializeCurrentFilterValuesFromQueryString',
          this.initialEncodedFilters
        )
      } else {
        await this.$store.dispatch('resetFilterState', this.resourceName)
      }
    },
  },

  computed: {
    /**
     * Get the name of the filter query string variable.
     */
    filterParameter() {
      return this.resourceName + '_filter'
    },
  },
}
