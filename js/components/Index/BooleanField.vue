<template>
    <div class="text-center">
        <span
            class="inline-block rounded-full w-2 h-2"
            :class="{'bg-success': field.value, 'bg-danger': !field.value}" />
    </div>
</template>

<script>
export default {
    props: ['resourceName', 'field'],
}
</script>
