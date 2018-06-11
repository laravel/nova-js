<template>
    <loading-card
        ref="card"
        :loading="loading"
        class="card relative border border-lg border-50 overflow-hidden px-0 py-0"
    >
        <div v-if="loading" style="height: 100px"/>

        <div class="missing p-8" v-if="missing">
            <p class="text-center leading-normal">
                <a :href="src" class="text-primary dim" target="_blank">This image</a> could not be found.
            </p>
        </div>
    </loading-card>
</template>

<script>
import axios from 'axios'
import { Minimum } from '@/util'

export default {
    props: {
        src: String,
    },

    data: () => ({
        loading: true,
        missing: false,
    }),

    mounted() {
        Minimum(
            axios.get(this.src, {
                responseType: 'blob',
            })
        )
            .then(({ headers, data }) => {
                const blob = new Blob([data], { type: headers['content-type'] })
                let newImage = new Image()
                newImage.src = window.URL.createObjectURL(blob)
                newImage.className = 'block w-full'
                this.$refs.card.$el.appendChild(newImage)
                this.loading = false
            })
            .catch(error => {
                this.missing = true
                this.$emit('missing', true)
                this.loading = false
            })
    },
}
</script>

<style scoped>
.card {
    padding: 0 !important;
}
</style>
