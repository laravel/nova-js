<template>
    <div class="border-b border-50 px-3 py-6 px-8">
        <form-label>
            {{ field.name }}
        </form-label>

        <date-time-picker
            class="w-full max-w-sm form-control form-input form-input-bordered"
            :name="field.name"
            :value="field.value"
            :placeholder="placeholder"
            :disabled="false"
            @change="handleChange" />

        <p v-if="hasError" class="my-2 text-danger">
            {{ firstError }}
        </p>
    </div>
</template>

<script>
import moment from 'moment'
import Calendar from '../Calendar'
import DateTimePicker from '../DateTimePicker'
import { Errors, FormField, HandlesValidationErrors } from '@/mixins'

export default {
    mixins: [HandlesValidationErrors, FormField],

    components: {
        Calendar,
        DateTimePicker,
    },

    computed: {
        placeholder() {
            let date = new moment()
            return date.format('MMMM D YYYY')
        },
    },
}
</script>
