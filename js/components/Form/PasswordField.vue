<template>
    <default-field :field-name="field.name">
        <template slot="field">
            <input
                :id="field.name"
                type="password"
                v-model="value"
                class="w-full max-w-sm form-control form-input form-input-bordered"
                :class="errorClasses"
                :placeholder="field.name"
            />

            <p v-if="hasError" class="my-2 text-danger">
                {{ firstError }}
            </p>
        </template>
    </default-field>
</template>

<script>
import { FormField, HandlesValidationErrors } from '@/mixins'

export default {
    mixins: [HandlesValidationErrors, FormField],
}
</script>
