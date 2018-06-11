<template>
    <modal @modal-close="handleClose">
        <form
            @submit="handleConfirm"
            slot-scope="props"
            class="bg-white rounded-lg shadow-lg overflow-hidden"
            style="width: 460px"
        >
            <div class="p-8">
                <heading :level="2" class="mb-6">{{ uppercaseMode }} Resource</heading>
                <p class="text-80">Are you sure you want to {{ mode }} this resource?</p>
            </div>

            <div class="bg-30 px-6 py-3 flex">
                <div class="ml-auto">
                    <button data-testid="cancel-button" @click.prevent="handleClose" class="btn text-80 font-normal h-9 px-3 mr-3 btn-link">Cancel</button>
                    <button ref="confirmButton" data-testid="confirm-button" type="submit" class="btn btn-default btn-danger">{{ uppercaseMode }}</button>
                </div>
            </div>
        </form>
    </modal>
</template>

<script>
export default {
    props: {
        mode: {
            type: String,
            default: 'delete',
            validator: function(value) {
                return ['delete', 'detach'].indexOf(value) !== -1
            },
        },
    },

    methods: {
        handleClose() {
            this.$emit('close')
        },

        handleConfirm() {
            this.$emit('confirm')
        },
    },

    /**
     * Mount the component.
     */
    mounted() {
        this.$refs.confirmButton.focus()
    },

    computed: {
        uppercaseMode() {
            return this.mode.replace(/^\w/, function(chr) {
                return chr.toUpperCase()
            })
        },
    },
}
</script>
