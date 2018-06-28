export default {
  data: () => ({ metricPanels: [] }),

  /**
   * Fetch all of the metrics panels for this view
   */
  created() {
    this.fetchMetricPanels()
  },

  methods: {
    async fetchMetricPanels() {
      const { data: panels } = await axios.get(this.metricsEndpoint)
      this.metricPanels = panels
    },
  },
}
