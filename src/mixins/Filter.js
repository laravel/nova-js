export default {
  props: {
    namespace: {
      type: String,
      required: true,
    },
    filterKey: {
      type: String,
      required: true,
    },
  },

  methods: {
    /**
     * Update filter value.
     * @param value
     */
    handleChange(value) {
      this.$store.commit(`${this.namespace}/updateFilterState`, {
        filterClass: this.filterKey,
        value,
      })

      this.$emit('change')
    },
  },

  computed: {
      value() {
        return this.filter.currentValue
      },

      filter() {
        return this.$store.getters[`${this.namespace}/getFilter`](this.filterKey)
      },

      options() {
        return this.$store.getters[`${this.namespace}/getOptionsForFilter`](this.filterKey)
      },
  },
}
