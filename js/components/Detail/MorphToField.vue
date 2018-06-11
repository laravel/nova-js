<template>
    <panel-item :field="field" :field-name="field.resourceLabel">
        <template slot="value">
            <router-link
                :to="{name: 'detail', params: {
                    resourceName: field.resourceName,
                    resourceId: field.morphToId
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
    props: ['resourceName', 'resourceId', 'field'],
}
</script>
