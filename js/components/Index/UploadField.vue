<template>
    <p>
        <img v-if="field.thumbnailUrl" :src="field.thumbnailUrl" class="rounded w-6 w-8" />
        <span v-else>&mdash;</span>
    </p>
</template>

<script>
export default {
    props: ['resourceName', 'field'],
}
</script>
