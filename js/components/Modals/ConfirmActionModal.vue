<template>
    <modal
        data-testid="confirm-action-modal"
        class="modal"
        tabindex="-1"
        role="dialog"
        @modal-close="handleClose"
    >
        <form
            @submit.prevent="handleConfirm"
            class="bg-white rounded-lg shadow-lg overflow-hidden"
            :class="{
                'w-600': selectedAction.fields.length > 0,
                'w-460': selectedAction.fields.length == 0,
            }"
        >
            <div>
                <heading :level="2" class="pt-8 px-8">{{ selectedAction.name }}</heading>

                <p v-if="selectedAction.fields.length == 0" class="text-80 px-8 my-8">
                    Are you sure you want to run this action?
                </p>

                <div v-else>
                    <!-- Validation Errors -->
                    <validation-errors :errors="errors" />

                    <!-- Action Fields -->
                    <div
                        class="action"
                        v-for="field in selectedAction.fields"
                        :key="field.attribute"
                    >
                        <component
                            :is="'form-' + field.component"
                            :errors="errors"
                            :resource-name="resourceName"
                            :field="field"
                            field-width-class="w-full"
                        />
                    </div>
                </div>
            </div>

            <div class="bg-30 px-6 py-3 flex">
                <div class="ml-auto">
                    <button @click.prevent="handleClose" class="btn text-80 font-normal h-9 px-3 mr-3 btn-link">Cancel</button>
                    <button type="submit" class="btn btn-default btn-primary">Run Action</button>
                </div>
            </div>
        </form>
    </modal>
</template>

<script>
import { Errors } from '@/mixins'

export default {
    props: {
        resourceName: {},
        selectedAction: {},
        errors: { required: true },
    },

    /**
     * Mount the component.
     */
    mounted() {
        document.querySelectorAll('.modal input')[0].focus()
    },

    methods: {
        /**
         * Execute the selected action.
         */
        handleConfirm(e) {
            this.$emit('confirm')
        },

        /**
         * Close the modal.
         */
        handleClose() {
            this.$emit('close')
        },
    },
}
</script>

<style scoped>
.w-460 {
    width: 460px;
}

.w-600 {
    width: 600px;
}
</style>
