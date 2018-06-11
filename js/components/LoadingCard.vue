<template>
    <card
        class="relative px-6 py-4"
        :class="{'overflow-hidden' : loading}"
    >
        <div v-if="loading" class="rounded-lg flex items-center justify-center absolute pin bg-white z-50">
            <Loader class="text-60" />
        </div>

        <slot />
    </card>
</template>

<script>
import Loader from './Icons/Loader'

export default {
    props: {
        loading: {
            type: Boolean,
            default: true,
        },
    },

    components: {
        Loader,
    },
}
</script>
