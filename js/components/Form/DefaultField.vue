<template>
    <field-wrapper>
        <div class="w-1/5 px-8 py-6">
            <slot>
                <form-label :for="fieldName">
                    {{ fieldName }}
                </form-label>
            </slot>
        </div>
        <div class="w-1/2 px-8 py-6">
            <slot name="field"/>
        </div>
    </field-wrapper>
</template>

<script>
export default {
    props: {
        fieldName: {
            type: String,
            required: true,
        },
    },
}
</script>
