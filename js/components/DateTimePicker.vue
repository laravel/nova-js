<script>
import flatpickr from 'flatpickr'
import 'flatpickr/dist/themes/airbnb.css'

export default {
  props: ['name', 'value', 'placeholder', 'disabled'],
  data() {
    return {
      flatpickr: null,
    }
  },
  mounted() {
    this.flatpickr = flatpickr(this.$refs.datePicker, {
      enableTime: true,
      //   onChange: this.onChange,
      onValueUpdate: this.onChange,
    })
  },
  methods: {
    onChange(event) {
      this.$emit('change', this.$refs.datePicker.value)
    },
  },
}
</script>

<template>
  <input
    :disabled="disabled"
    :value="value"
    :name="name"
    ref="datePicker"
    type="text"
    :placeholder="placeholder">
</template>

<style scoped>
.\!cursor-not-allowed {
  cursor: not-allowed !important;
}
</style>
