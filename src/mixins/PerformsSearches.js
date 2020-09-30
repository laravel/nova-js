import debounce from 'lodash/debounce'

export default {
  data: () => ({
    search: '',
    selectedResource: '',
    availableResources: [],
  }),

  methods: {
    /**
     * Set the currently selected resource
     */
    selectResource(resource) {
      this.selectedResource = resource

      if (this.field) {
        Nova.$emit(this.field.attribute + '-change', this.selectedResource.value)
      }
    },

    /**
     * Handle the search box being cleared.
     */
    handleSearchCleared() {
      this.availableResources = []
    },

    /**
     * Clear the selected resource and availableResources
     */
    clearSelection() {
      this.selectedResource = ''
      this.availableResources = []

      if (this.field) {
        Nova.$emit(this.field.attribute + '-change', null)
      }
    },

    /**
     * Perform a search to get the relatable resources.
     */
    performSearch(search) {
      this.search = search

      const trimmedSearch = search.trim()
      // If the user performs an empty search, it will load all the results
      // so let's just set the availableResources to an empty array to avoid
      // loading a huge result set
      if (trimmedSearch == '') {
        return
      }

      this.debouncer(() => {
        this.getAvailableResources(trimmedSearch)
      }, 500)
    },

    /**
     * Debounce function for the search handler
     */
    debouncer: debounce(callback => callback(), 500),
  },
}
