export default {
  data: () => ({ cards: [] }),

  /**
   * Fetch all of the metrics panels for this view
   */
  created() {
    this.fetchCards()
  },

  methods: {
    async fetchCards() {
      const { data: cards } = await Nova.request().get(this.cardsEndpoint)

      this.cards = cards
    },
  },
}
