import map from 'lodash/map'

export default {
  methods: {
    /**
     * Open the delete menu modal.
     */
    openDeleteModal() {
      this.deleteModalOpened = true
    },

    /**
     * Delete the given resources.
     */
    deleteResources(resources) {
      if (this.viaManyToMany) {
        return this.detachResources(resources)
      }

      axios({
        method: 'delete',
        url: `/nova-api/${this.resourceName}`,
        params: this.queryString,
        data: {
          resources: map(resources, resource => resource.id.value),
        },
      }).then(() => {
        this.$toasted.show('The resource was deleted!', { type: 'success' })
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

      axios({
        method: 'delete',
        url: `/nova-api/${this.resourceName}`,
        params: this.queryString,
        data: {
          resources: 'all',
        },
      }).then(() => {
        this.$toasted.show('The matching resources were deleted!', { type: 'success' })
        this.getResources()
      })
    },

    /**
     * Detach the given resources.
     */
    detachResources(resources) {
      axios({
        method: 'delete',
        url: `/nova-api/${this.resourceName}/detach`,
        params: this.queryString,
        data: {
          resources: map(resources, resource => resource.id.value),
        },
      }).then(() => {
        this.$toasted.show('The resources were detached!', { type: 'success' })
        this.getResources()
      })
    },

    /**
     * Detach all of the matching resources.
     */
    detachAllMatchingResources() {
      axios({
        method: 'delete',
        url: `/nova-api/${this.resourceName}/detach`,
        params: this.queryString,
        data: {
          resources: 'all',
        },
      }).then(() => {
        this.$toasted.show('All matching resources were detached!', { type: 'success' })
        this.getResources()
      })
    },

    /**
     * Force delete the given resources.
     */
    forceDeleteResources(resources) {
      axios({
        method: 'delete',
        url: `/nova-api/${this.resourceName}/force`,
        params: this.queryString,
        data: {
          resources: map(resources, resource => resource.id.value),
        },
      }).then(() => {
        this.$toasted.show('The resources were force deleted!', { type: 'success' })
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
      axios({
        method: 'delete',
        url: `/nova-api/${this.resourceName}/force`,
        params: this.queryString,
        data: {
          resources: 'all',
        },
      }).then(() => {
        this.$toasted.show('All matching resources were force deleted!', {
          type: 'success',
        })
        this.getResources()
      })
    },

    /**
     * Restore the given resources.
     */
    restoreResources(resources) {
      axios({
        method: 'put',
        url: `/nova-api/${this.resourceName}/restore`,
        params: this.queryString,
        data: {
          resources: map(resources, resource => resource.id.value),
        },
      }).then(() => {
        // this.deleteModalOpened = false
        this.$toasted.show('The resources were restored!', { type: 'success' })
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
      axios({
        method: 'put',
        url: `/nova-api/${this.resourceName}/restore`,
        params: this.queryString,
        data: {
          resources: 'all',
        },
      }).then(() => {
        // this.deleteModalOpened = false
        this.$toasted.show('All matching resources were restored!', { type: 'success' })
        this.getResources()
      })
    },
  },

  computed: {
    /**
     * Get the query string for a delete resource request.
     */
    queryString() {
      return {
        search: this.currentSearch,
        filters: this.encodedFilters,
        trashed: this.currentTrashed,
        viaResource: this.viaResource,
        viaResourceId: this.viaResourceId,
        viaRelationship: this.viaRelationship,
      }
    },
  },
}
