<template>
    <panel-item :field="field">
        <template slot="value">
            <router-link
                :to="{name: 'detail', params: {
                    resourceName: field.resourceName,
                    resourceId: field.belongsToId
                }}"
                class="no-underline font-bold dim text-primary"
            >
                {{ field.value }}
            </router-link>
        </template>
    </panel-item>
</template>

<script>
export default {
    props: ['resource', 'resourceName', 'resourceId', 'field'],
}
</script>
