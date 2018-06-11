<script>
const classes = {
    '1': 'text-90 font-normal text-2xl',
    '2': 'text-90 font-normal text-xl',
}

export default {
    props: {
        level: {
            default: 1,
            type: Number,
        },
    },

    render(h) {
        return h('h' + this.level, { class: classes[this.level] }, this.$slots.default)
    },
}
</script>
