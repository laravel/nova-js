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

            axios
                .delete('/nova-api/' + this.resourceName + this.deleteRequestQueryString(), {
                    params: {
                        resources: _.map(resources, resource => resource.id.value),
                    },
                })
                .then(response => {
                    this.deleteModalOpened = false

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
                .then(response => {
                    this.deleteModalOpened = false

                    this.getResources()
                })
        },

        /**
         * Detach the given resources.
         */
        detachResources(resources) {
            axios
                .delete(
                    '/nova-api/' + this.resourceName + '/detach' + this.deleteRequestQueryString(),
                    {
                        params: {
                            resources: _.map(resources, resource => resource.id.value),
                        },
                    }
                )
                .then(response => {
                    this.deleteModalOpened = false

                    this.getResources()
                })
        },

        /**
         * Detach all of the matching resources.
         */
        detachAllMatchingResources() {
            axios
                .delete(
                    '/nova-api/' + this.resourceName + '/detach' + this.deleteRequestQueryString(),
                    {
                        params: {
                            resources: 'all',
                        },
                    }
                )
                .then(response => {
                    this.deleteModalOpened = false

                    this.getResources()
                })
        },

        /**
         * Force delete the given resources.
         */
        forceDeleteResources(resources) {
            axios
                .delete(
                    '/nova-api/' + this.resourceName + '/force' + this.deleteRequestQueryString(),
                    {
                        params: {
                            resources: _.map(resources, resource => resource.id.value),
                        },
                    }
                )
                .then(response => {
                    this.deleteModalOpened = false

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
                .delete(
                    '/nova-api/' + this.resourceName + '/force' + this.deleteRequestQueryString(),
                    {
                        params: {
                            resources: 'all',
                        },
                    }
                )
                .then(response => {
                    this.deleteModalOpened = false

                    this.getResources()
                })
        },

        /**
         * Restore the given resources.
         */
        restoreResources(resources) {
            axios
                .put(
                    '/nova-api/' + this.resourceName + '/restore' + this.deleteRequestQueryString(),
                    {
                        resources: _.map(resources, resource => resource.id.value),
                    }
                )
                .then(response => {
                    this.deleteModalOpened = false

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
                .put(
                    '/nova-api/' + this.resourceName + '/restore' + this.deleteRequestQueryString(),
                    {
                        resources: 'all',
                    }
                )
                .then(response => {
                    this.deleteModalOpened = false

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
