export default {
  props: {
    resourceName: {},
    field: {},
  },

  data: () => ({
    value: '',
  }),

  mounted() {
    this.setInitialValue()

    // Add a default fill method for the field
    this.field.fill = this.fill
  },

  methods: {
    /*
     * Set the initial value for the field
     */
    setInitialValue() {
      this.value = this.field.value || ''
    },

    /**
     * Provide a function the fills a passed FormData object with the
     * field's internal value attribute
     */
    fill(formData) {
      formData.append(this.field.attribute, this.value || '')
    },

    /**
     * Update the field's internal value
     */
    handleChange(value) {
      this.value = value
    },
  },
}
