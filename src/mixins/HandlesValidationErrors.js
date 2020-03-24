import { Errors } from 'form-backend-validation'

export default {
  props: {
    errors: {
      default: () => new Errors(),
    },
  },

  data: () => ({
    errorClass: 'border-danger',
  }),

  computed: {
    errorClasses() {
      return this.hasError ? [this.errorClass] : []
    },

    fieldAttribute() {
      return this.field.attribute
    },

    validationKey() {
      return this.field.validationKey
    },

    hasError() {
      return this.errors.has(this.validationKey)
    },

    firstError() {
      if (this.hasError) {
        return this.errors.first(this.validationKey)
      }
    },
  },
}
