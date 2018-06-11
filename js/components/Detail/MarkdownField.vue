<template>
    <panel-item :field="field">
        <template slot="value">
            <excerpt :content="excerpt" />
        </template>
    </panel-item>
</template>

<script>
import Excerpt from '../Excerpt'
const md = require('markdown-it')()

export default {
    props: ['resource', 'resourceName', 'resourceId', 'field'],

    components: { Excerpt },

    computed: {
        excerpt() {
            return md.render(this.field.value)
        },
    },
}
</script>
