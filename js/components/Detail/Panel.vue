<template>
    <div>
        <slot>
            <h4 class="text-90 font-normal text-2xl mb-3">{{ panel.name }}</h4>
        </slot>

        <card class="mb-6 py-3 px-6">
            <component
                :class="{'remove-bottom-border': index == panel.fields.length - 1}"
                :key="index"
                v-for="(field, index) in panel.fields"
                :is="resolveComponentName(field)"
                :resource-name="resourceName"
                :resource-id="resourceId"
                :resource="resource"
                :field="field"
                @actionExecuted="actionExecuted"
            />
        </card>
    </div>
</template>

<script>
import { BehavesAsPanel } from './../../mixins'

export default {
    mixins: [BehavesAsPanel],

    methods: {
        /**
         * Resolve the component name.
         */
        resolveComponentName(field) {
            return field.prefixComponent ? 'detail-' + field.component : field.component
        },
    },
}
</script>
