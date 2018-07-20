import cardSizes from '../util/cardSizes'

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

  computed: {
    /**
     * Determine whether we have cards to show on the Dashboard
     */
    shouldShowCards() {
      return this.cards.length > 0
    },

    /**
     * Return the small cards used for the Dashboard
     */
    smallCards() {
      return _.filter(this.cards, c => cardSizes.indexOf(c.width) !== -1)
    },

    /**
     * Return the full-width cards used for the Dashboard
     */
    largeCards() {
      return _.filter(this.cards, c => c.width == 'full')
    },
  },
}
