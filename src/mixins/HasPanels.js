export default {
  data: () => ({ panels: [] }),

  /**
   * Fetch all of the metrics panels for this view
   */
  created() {
    this.fetchPanels()
  },

  methods: {
    async fetchPanels() {
      const { data: panels } = await axios.get(this.metricsEndpoint)
      this.panels = panels
    },
  },
}
