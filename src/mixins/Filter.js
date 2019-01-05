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
    change(value) {
      this.$store.commit(`${this.namespace}/updateFilterState`, {
        filterClass: this.filterKey,
        value,
      })

      this.$emit('change')
    },

    /**
     * Set option value for filter.
     *
     * @param {string} option
     * @param {*} value
     * @return {*}
     */
    changeOption(option, value) {
      this.change({ ...this.value, [option]: value })
    },

    /**
     * Get option value for filter.
     *
     * @param {string} option
     * @return {*}
     */
    optionValue(option) {
      return this.$store.getters[`${this.namespace}/filterOptionValue`](
          this.filterKey,
          option
      )
    }
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
