<template>
    <field-wrapper>
        <div class="w-1/5 px-8 py-6">
            <slot>
                <form-label :for="field.name">
                    {{ field.name }}
                </form-label>
            </slot>
        </div>
        <div class="w-4/5 px-8 py-6">
            <trix
                name="trixman"
                :value="field.value"
                placeholder="Put some stuff here"
                @change="handleChange"
            />

            <p v-if="hasError" class="my-2 text-danger">
                {{ firstError }}
            </p>
        </div>
    </field-wrapper>
</template>

<script>
import Trix from '../Trix'
import { FormField, HandlesValidationErrors } from '@/mixins'

export default {
    mixins: [HandlesValidationErrors, FormField],
    components: { Trix },
}
</script>
