export const FormField = {
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

    // Register a global event for setting the field's value
    Nova.$on(this.field.attribute + '-value', value => {
      this.value = value
    })
  },

  destroyed() {
    Nova.$off(this.field.attribute + '-value')
  },

  methods: {
    /*
     * Set the initial value for the field
     */
    setInitialValue() {
      this.value = !(this.field.value === undefined || this.field.value === null)
        ? this.field.value
        : ''
    },

    /**
     * Provide a function that fills a passed FormData object with the
     * field's internal value attribute
     */
    fill(formData) {
      formData.append(this.field.attribute, String(this.value))
    },

    /**
     * Update the field's internal value
     */
    handleChange(value) {
      this.value = value
    },
  },
}
