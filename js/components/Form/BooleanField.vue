<template>
    <default-field :field-name="field.name">
        <template slot="field">
            <checkbox
                class="py-2"
                @input="toggle"
                :id="field.name"
                :name="field.name"
                :checked="checked"
            />

            <p v-if="hasError" class="my-2 text-danger" v-html="firstError" />
        </template>
    </default-field>
</template>

<script>
import { Errors, FormField, HandlesValidationErrors } from '@/mixins'

export default {
    mixins: [HandlesValidationErrors, FormField],

    data: () => ({
        value: false,
    }),

    mounted() {
        this.value = this.field.value || false

        this.field.fill = formData => {
            formData.append(this.field.attribute, this.trueValue)
        }
    },

    methods: {
        toggle() {
            this.value = !this.value
        },
    },

    computed: {
        checked() {
            return Boolean(this.value)
        },

        trueValue() {
            return +this.checked
        },
    },
}
</script>
