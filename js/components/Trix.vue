<script>
import 'trix'
import 'trix/dist/trix.css'

export default {
  name: 'trix-vue',
  props: ['name', 'value', 'placeholder'],
  methods: {
    onInitialize() {
      this.$refs.theEditor.editor.insertHTML(this.value)
    },
    onChange() {
      this.$emit('change', this.$refs.theEditor.value)
    },
  },
}
</script>

<template>
    <trix-editor
        ref="theEditor"
        @trix-change="onChange"
        @trix-initialize="onInitialize"
        :value="value"
        :placeholder="placeholder"
    />
</template>
