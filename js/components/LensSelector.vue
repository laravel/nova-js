<template>
    <div>
        <!-- Available Lenses -->
        <div v-for="lens in lenses">
            <router-link
                :to="{name: 'lens', params: {resourceName: resourceName, lens: lens.uriKey }}"
                class="text-base text-90 my-2 no-underline">
                {{ lens.name }}
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['resourceName', 'lenses']
    }
</script>
