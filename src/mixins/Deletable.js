import map from 'lodash/map'

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

<<<<<<< HEAD
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
=======
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
>>>>>>> 67a8bc299ca944aac548b395951821c813e3f581
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

<<<<<<< HEAD
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
=======
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
>>>>>>> 67a8bc299ca944aac548b395951821c813e3f581
    },

    /**
     * Detach the given resources.
     */
    detachResources(resources) {
<<<<<<< HEAD
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
=======
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
>>>>>>> 67a8bc299ca944aac548b395951821c813e3f581
    },

    /**
     * Detach all of the matching resources.
     */
    detachAllMatchingResources() {
<<<<<<< HEAD
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
=======
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
>>>>>>> 67a8bc299ca944aac548b395951821c813e3f581
    },

    /**
     * Force delete the given resources.
     */
<<<<<<< HEAD
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
=======
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
>>>>>>> 67a8bc299ca944aac548b395951821c813e3f581
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
<<<<<<< HEAD
      axios
        .delete('/nova-api/' + this.resourceName + '/force' + this.deleteRequestQueryString(), {
          params: {
            resources: 'all',
          },
        })
        .then(() => {
          this.deleteModalOpen = false

          this.getResources()
=======
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
>>>>>>> 67a8bc299ca944aac548b395951821c813e3f581
        })
        this.getResources()
      })
    },

    /**
     * Restore the given resources.
     */
<<<<<<< HEAD
    restoreResources(resources, callback = null) {
      return axios
        .put('/nova-api/' + this.resourceName + '/restore' + this.deleteRequestQueryString(), {
          resources: _.map(resources, resource => resource.id.value),
        })
        .then(callback ? callback : () => {
          this.restoreModalOpen = false

          this.getResources()
        })
=======
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
>>>>>>> 67a8bc299ca944aac548b395951821c813e3f581
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
<<<<<<< HEAD
        })
        .then(() => {
          this.restoreModalOpen = false

          this.getResources()
        })
=======
        },
      }).then(() => {
        // this.deleteModalOpened = false
        this.$toasted.show('All matching resources were restored!', { type: 'success' })
        this.getResources()
      })
>>>>>>> 67a8bc299ca944aac548b395951821c813e3f581
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
