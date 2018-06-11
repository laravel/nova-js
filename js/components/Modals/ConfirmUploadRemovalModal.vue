<template>
    <modal @modal-close="handleClose">
        <div
            class="bg-white rounded-lg shadow-lg overflow-hidden"
            style="width: 460px"
        >
            <div class="p-8">
                <heading :level="2" class="mb-6">Delete File</heading>
                <p class="text-80">Are you sure you want to delete this file?</p>
            </div>

            <div class="bg-30 px-6 py-3 flex">
                <div class="ml-auto">
                    <button data-testid="cancel-button" @click.prevent="handleClose" class="btn text-80 font-normal h-9 px-3 mr-3 btn-link">Cancel</button>
                    <button ref="confirmButton" data-testid="confirm-button" @click.prevent="handleConfirm" class="btn btn-default btn-danger">Delete</button>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
export default {
    /**
     * Mount the component.
     */
    mounted() {
        this.$refs.confirmButton.focus()
    },

    methods: {
        handleClose() {
            this.$emit('close')
        },

        handleConfirm() {
            this.$emit('confirm')
        },
    },
}
</script>
