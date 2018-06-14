export default {
  data: () => ({
    withTrashed: false,
  }),

  methods: {
    /**
     * Toggle the trashed state of the search
     */
    toggleWithTrashed() {
      this.withTrashed = !this.withTrashed
    },

    /**
     * Enable searching for trashed resources
     */
    enableWithTrashed() {
      this.withTrashed = true
    },

    /**
     * Disable searching for trashed resources
     */
    disableWithTrashed() {
      this.withTrashed = false
    },
  },
}
