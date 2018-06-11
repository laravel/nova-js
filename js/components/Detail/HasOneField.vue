<template>
    <resource-index
        :resource-name="field.resourceName"
        :via-resource="resourceName"
        :via-resource-id="resourceId"
        :via-relationship="field.hasOneRelationship"
        :relationship-type="'hasOne'"
        @actionExecuted="actionExecuted" />
</template>

<script>
export default {
    props: ['resourceName', 'resourceId', 'resource', 'field'],

    methods: {
        /**
         * Handle the actionExecuted event and pass it up the chain.
         */
        actionExecuted() {
            this.$emit('actionExecuted')
        },
    },
}
</script>
