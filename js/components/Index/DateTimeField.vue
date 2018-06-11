<template>
    <pre class="text-80 text-sm">{{ field.value }}</pre>
</template>

<script>
export default {
    props: ['resourceName', 'field'],
}
</script>
