import { Errors } from './'

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

        hasError() {
            return this.errors.has(this.fieldAttribute)
        },

        firstError() {
            if (this.hasError) {
                return this.errors.first(this.fieldAttribute)
            }
        },
    },
}
