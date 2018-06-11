<template>
    <router-link
        v-if="field.value"
        :to="{
            name: 'detail',
            params: {
                resourceName: field.resourceName,
                resourceId: field.morphToId
            }
        }"
        class="no-underline text-primary font-bold"
    >
        {{ field.resourceLabel }}: {{ field.value }}
    </router-link>

    <span v-else>
        -
    </span>
</template>

<script>
export default {
    props: ['resourceName', 'field'],
}
</script>
