<template>
    <div class="modal select-none fixed pin flex justify-center items-center z-50">
        <div v-on-clickaway="close" class="z-20 bg-white rounded-lg shadow-lg overflow-hidden">
            <slot />
        </div>
        <div @click="close" class="absolute pin bg-80 z-0 opacity-25" />
    </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'

export default {
    mixins: [clickaway],

    created() {
        document.addEventListener('keydown', this.handleEscape)
    },

    destroyed() {
        document.removeEventListener('keydown', this.handleEscape)
    },

    methods: {
        handleEscape(e) {
            if (e.keyCode == 27) {
                this.close()
            }
        },

        close() {
            this.$emit('modal-close')
        },
    },
}
</script>
