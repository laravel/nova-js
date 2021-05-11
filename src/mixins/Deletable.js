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

      return Nova.request({
        url: '/nova-api/' + this.resourceName,
        method: 'delete',
        params: {
          ...this.queryString,
          ...{ resources: mapResources(resources) },
        },
      }).then(
        callback
          ? callback
          : () => {
              this.deleteModalOpen = false
              this.getResources()
            }
      ).then(() => {
        Nova.$emit('resources-deleted')
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

      return Nova.request({
        url: this.deleteAllMatchingResourcesEndpoint,
        method: 'delete',
        params: {
          ...this.queryString,
          ...{ resources: 'all' },
        },
      }).then(() => {
        this.deleteModalOpen = false
        this.getResources()
      }).then(() => {
        Nova.$emit('resources-deleted')
      })
    },

    /**
     * Detach the given resources.
     */
    detachResources(resources) {
      return Nova.request({
        url: '/nova-api/' + this.resourceName + '/detach',
        method: 'delete',
        params: {
          ...this.queryString,
          ...{ resources: mapResources(resources) },
          ...{ pivots: mapPivots(resources) },
        },
      }).then(() => {
        this.deleteModalOpen = false
        this.getResources()
      }).then(() => {
        Nova.$emit('resources-detached')
      })
    },

    /**
     * Detach all of the matching resources.
     */
    detachAllMatchingResources() {
      return Nova.request({
        url: '/nova-api/' + this.resourceName + '/detach',
        method: 'delete',
        params: {
          ...this.queryString,
          ...{ resources: 'all' },
        },
      }).then(() => {
        this.deleteModalOpen = false
        this.getResources()
      }).then(() => {
        Nova.$emit('resources-detached')
      })
    },

    /**
     * Force delete the given resources.
     */
    forceDeleteResources(resources, callback = null) {
      return Nova.request({
        url: '/nova-api/' + this.resourceName + '/force',
        method: 'delete',
        params: {
          ...this.queryString,
          ...{ resources: mapResources(resources) },
        },
      }).then(
        callback
          ? callback
          : () => {
              this.deleteModalOpen = false

              this.getResources()
            }
      ).then(() => {
        Nova.$emit('resources-deleted')
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
      return Nova.request({
        url: this.forceDeleteSelectedResourcesEndpoint,
        method: 'delete',
        params: {
          ...this.queryString,
          ...{ resources: 'all' },
        },
      }).then(() => {
        this.deleteModalOpen = false
        this.getResources()
      }).then(() => {
        Nova.$emit('resources-deleted')
      })
    },

    /**
     * Restore the given resources.
     */
    restoreResources(resources, callback = null) {
      return Nova.request({
        url: '/nova-api/' + this.resourceName + '/restore',
        method: 'put',
        params: {
          ...this.queryString,
          ...{ resources: mapResources(resources) },
        },
      }).then(
        callback
          ? callback
          : () => {
              this.restoreModalOpen = false

              this.getResources()
            }
      ).then(() => {
        Nova.$emit('resources-restored')
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
      return Nova.request({
        url: this.restoreAllMatchingResourcesEndpoint,
        method: 'put',
        params: {
          ...this.queryString,
          ...{ resources: 'all' },
        },
      }).then(() => {
        this.restoreModalOpen = false
        this.getResources()
      }).then(() => {
        Nova.$emit('resources-restored')
      })
    },
  },

  computed: {
    /**
     * Get the delete all matching resources endpoint.
     */
    deleteAllMatchingResourcesEndpoint() {
      if (this.lens) {
        return '/nova-api/' + this.resourceName + '/lens/' + this.lens
      }

      return '/nova-api/' + this.resourceName
    },

    /**
     * Get the force delete all of the matching resources endpoint.
     */
    forceDeleteSelectedResourcesEndpoint() {
      if (this.lens) {
        return '/nova-api/' + this.resourceName + '/lens/' + this.lens + '/force'
      }

      return '/nova-api/' + this.resourceName + '/force'
    },

    /**
     * Get the restore all of the matching resources endpoint.
     */
    restoreAllMatchingResourcesEndpoint() {
      if (this.lens) {
        return '/nova-api/' + this.resourceName + '/lens/' + this.lens + '/restore'
      }

      return '/nova-api/' + this.resourceName + '/restore'
    },

    /**
     * Get the query string for a deletable resource request.
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

function mapResources(resources) {
  return _.map(resources, resource => resource.id.value)
}

function mapPivots(resources) {
  return _.filter(_.map(resources, resource => resource.id.pivotValue))
}
