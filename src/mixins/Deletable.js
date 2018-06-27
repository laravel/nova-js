export default {
  methods: {
    /**
     * Open the delete menu modal.
     */
    openDeleteModal() {
      this.deleteModalOpen = true
    },

    /**
     * Delete the given resources.
     */
    deleteResources(resources, callback = null) {
      if (this.viaManyToMany) {
        return this.detachResources(resources)
      }

      return axios
        .delete('/nova-api/' + this.resourceName + this.deleteRequestQueryString(), {
          params: {
            resources: _.map(resources, resource => resource.id.value),
          },
        })
        .then(callback ? callback : () => {
          this.deleteModalOpen = false

          this.getResources()
        })
    },

    /**
     * Delete the selected resources.
     */
    deleteSelectedResources() {
      this.deleteResources(this.selectedResources)
    },

    /**
     * Delete all of the matching resources.
     */
    deleteAllMatchingResources() {
      if (this.viaManyToMany) {
        return this.detachAllMatchingResources()
      }

      axios
        .delete('/nova-api/' + this.resourceName + this.deleteRequestQueryString(), {
          params: {
            resources: 'all',
          },
        })
        .then(() => {
          this.deleteModalOpen = false

          this.getResources()
        })
    },

    /**
     * Detach the given resources.
     */
    detachResources(resources) {
      axios
        .delete('/nova-api/' + this.resourceName + '/detach' + this.deleteRequestQueryString(), {
          params: {
            resources: _.map(resources, resource => resource.id.value),
          },
        })
        .then(() => {
          this.deleteModalOpen = false

          this.getResources()
        })
    },

    /**
     * Detach all of the matching resources.
     */
    detachAllMatchingResources() {
      axios
        .delete('/nova-api/' + this.resourceName + '/detach' + this.deleteRequestQueryString(), {
          params: {
            resources: 'all',
          },
        })
        .then(() => {
          this.deleteModalOpen = false

          this.getResources()
        })
    },

    /**
     * Force delete the given resources.
     */
    forceDeleteResources(resources, callback = null) {
      return axios
        .delete('/nova-api/' + this.resourceName + '/force' + this.deleteRequestQueryString(), {
          params: {
            resources: _.map(resources, resource => resource.id.value),
          },
        })
        .then(callback ? callback : () => {
          this.deleteModalOpen = false

          this.getResources()
        })
    },

    /**
     * Force delete the selected resources.
     */
    forceDeleteSelectedResources() {
      this.forceDeleteResources(this.selectedResources)
    },

    /**
     * Force delete all of the matching resources.
     */
    forceDeleteAllMatchingResources() {
      axios
        .delete('/nova-api/' + this.resourceName + '/force' + this.deleteRequestQueryString(), {
          params: {
            resources: 'all',
          },
        })
        .then(() => {
          this.deleteModalOpen = false

          this.getResources()
        })
    },

    /**
     * Restore the given resources.
     */
    restoreResources(resources, callback = null) {
      return axios
        .put('/nova-api/' + this.resourceName + '/restore' + this.deleteRequestQueryString(), {
          resources: _.map(resources, resource => resource.id.value),
        })
        .then(callback ? callback : () => {
          this.restoreModalOpen = false

          this.getResources()
        })
    },

    /**
     * Restore the selected resources.
     */
    restoreSelectedResources() {
      this.restoreResources(this.selectedResources)
    },

    /**
     * Restore all of the matching resources.
     */
    restoreAllMatchingResources() {
      axios
        .put('/nova-api/' + this.resourceName + '/restore' + this.deleteRequestQueryString(), {
          resources: 'all',
        })
        .then(() => {
          this.restoreModalOpen = false

          this.getResources()
        })
    },

    /**
     * Get the query string for a delete resource request.
     */
    deleteRequestQueryString() {
      return (
        '?search=' +
        this.currentSearch +
        '&filters=' +
        this.encodedFilters +
        '&trashed=' +
        this.currentTrashed +
        '&viaResource=' +
        this.viaResource +
        '&viaResourceId=' +
        this.viaResourceId +
        '&viaRelationship=' +
        this.viaRelationship
      )
    },
  },
}
