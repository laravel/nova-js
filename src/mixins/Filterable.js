import each from 'lodash/each'
import get from 'lodash/get'

export default {
  methods: {
    /**
     * Clear filters and reset the resource table
     */
    async clearSelectedFilters(lens) {
      if (lens) {
        await this.$store.dispatch(`${this.resourceNamespace}/resetFilterState`, {
          resourceName: this.resourceName,
          lens,
        })
      } else {
        await this.$store.dispatch(`${this.resourceNamespace}/resetFilterState`, {
          resourceName: this.resourceName,
        })
      }

      this.updateQueryString({
        [this.pageParameter]: 1,
        [this.filterParameter]: '',
      })
    },

    /**
     * Handle a filter state change.
     */
    filterChanged() {
      console.log(this.$store.getters[`${this.resourceNamespace}/currentEncodedFilters`]);
      this.updateQueryString({
        [this.pageParameter]: 1,
        [this.filterParameter]: this.$store.getters[`${this.resourceNamespace}/currentEncodedFilters`],
      })
    },

    /**
     * Set up filters for the current view
     */
    async initializeFilters(lens) {
      // Clear out the filters from the store first
      this.$store.commit(`${this.resourceNamespace}/clearFilters`)

      await this.$store.dispatch(`${this.resourceNamespace}/fetchFilters`, {
        resourceName: this.resourceName,
        lens,
      })
      await this.initializeState(lens)
    },

    /**
     * Initialize the filter state
     */
    async initializeState(lens) {
      this.initialEncodedFilters
        ? await this.$store.dispatch(
            `${this.resourceName}/initializeCurrentFilterValuesFromQueryString`,
            this.initialEncodedFilters
          )
        : await this.$store.dispatch(`${this.resourceNamespace}/resetFilterState`, {
            resourceName: this.resourceName,
            lens,
          })
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
     * Return the resource store namespace
     */
    resourceNamespace() {
      return this.resourceName;
    },

    /**
     * Return the currently encoded filter string from the store
     */
    encodedFilters() {
      return this.$store.getters[`${this.resourceNamespace}/currentEncodedFilters`]
    },

    /**
     * Return the initial encoded filters from the query string
     */
    initialEncodedFilters() {
      return this.$route.query[this.filterParameter] || ''
    },
  },
}
