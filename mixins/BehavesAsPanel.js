export const BehavesAsPanel = {
  props: ['resourceName', 'resourceId', 'resource', 'panel'],

  methods: {
    /**
     * Handle the actionExecuted event and pass it up the chain.
     */
    actionExecuted() {
      this.$emit('actionExecuted')
    },
  },
}
