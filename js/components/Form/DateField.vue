<template>
    <div class="border-b border-50 px-3 py-6 px-8">
        <form-label>
            {{ field.name }}
        </form-label>

        <calendar
            value=""
            :handle-change="handleChange"
            class="w-full max-w-sm form-control form-input form-input-bordered"
            :class="errorClasses"
            :placeholder="field.name" />

        <p v-if="hasError" class="my-2 text-danger">
            {{ firstError }}
        </p>
    </div>
</template>

<script>
import Calendar from '../Calendar'
import DateTimePicker from '../DateTimePicker'
import { Errors, FormField, HandlesValidationErrors } from '@/mixins'

export default {
    mixins: [HandlesValidationErrors, FormField],

    components: {
        Calendar,
        DateTimePicker,
    },

    methods: {
        handleChange(e) {
            this.value = e.target.value
        },
    },
}
</script>
