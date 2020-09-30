import { mapProps } from '../propTypes'

export default {
  props: mapProps([
    'shownViaNewRelationModal',
    'field',
    'viaResource',
    'viaResourceId',
    'viaRelationship',
    'resourceName',
    'showHelpText',
  ]),

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
    handleChange(event) {
      this.value = event.target.value

      if (this.field) {
        Nova.$emit(this.field.attribute + '-change', this.value)
      }
    },
  },

  computed: {
    /**
     * Determine if the field is in readonly mode
     */
    isReadonly() {
      return this.field.readonly || _.get(this.field, 'extraAttributes.readonly')
    },
  },
}
