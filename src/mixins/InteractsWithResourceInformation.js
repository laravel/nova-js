export default {
  computed: {
    /**
     * Get the resource information object for the current resource.
     */
    resourceInformation() {
      return _.find(Nova.config.resources, resource => {
        return resource.uriKey == this.resourceName
      })
    },

    /**
     * Get the resource information object for the current resource.
     */
    viaResourceInformation() {
      if (!this.viaResource) {
        return
      }

      return _.find(Nova.config.resources, resource => {
        return resource.uriKey == this.viaResource
      })
    },

    /**
     * Determine if the user is authorized to create the current resource.
     */
    authorizedToCreate() {
      return this.resourceInformation.authorizedToCreate
    },
  },
}
