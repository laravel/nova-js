export default {
  methods: {
    /**
     * Select the previous page.
     */
    selectPreviousPage() {
      this.updateQueryString({ [this.pageParameter]: this.currentPage - 1 })
    },

    /**
     * Select the next page.
     */
    selectNextPage() {
      this.updateQueryString({ [this.pageParameter]: this.currentPage + 1 })
    },
  },

  computed: {
    /**
     * Get the current page from the query string.
     */
    currentPage() {
      return parseInt(this.$route.query[this.pageParameter] || 1)
    },
  },
}
