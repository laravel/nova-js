<template>
    <!-- Delete Menu -->
    <div>
        <button class="text-90 my-2" @click="deleteSelectedResources"
            v-if="selectedResources.length > 0 && authorizedToDeleteSelectedResources">
                <span v-if="viaManyToMany">Detach Selected</span>
                <span v-else>Delete Selected</span>
        </button>

        <button class="text-90 my-2" @click="deleteAllMatchingResources"
                v-if="authorizedToDeleteAnyResources">
            <span v-if="viaManyToMany">Detach All Matching</span>
            <span v-else>Delete All Matching</span>
        </button>

        <!-- Force Delete Resources -->
        <button class="text-90 my-2" @click="forceDeleteSelectedResources"
            v-if="softDeletes && ! viaManyToMany && selectedResources.length > 0 &&
                  authorizedToForceDeleteSelectedResources">
            Force Delete Selected
        </button>

        <button class="text-90 my-2" @click="forceDeleteAllMatchingResources"
            v-if="softDeletes && ! viaManyToMany &&
                  authorizedToForceDeleteAnyResources">
            Force Delete All Matching
        </button>

        <!-- Restore Resources -->
        <button class="text-90 my-2" @click="restoreSelectedResources"
            v-if="softDeletes &&
                  ! viaManyToMany &&
                  softDeletedResourcesSelected &&
                  authorizedToRestoreSelectedResources">
            Restore Selected
        </button>

        <button class="text-90 my-2" @click="restoreAllMatchingResources"
            v-if="softDeletes && ! viaManyToMany &&
                  authorizedToRestoreAnyResources">
            Restore All Matching
        </button>
    </div>
</template>

<script>
export default {
    props: ['softDeletes', 'resources', 'selectedResources', 'viaManyToMany'],

    /**
     * Mount the component.
     */
    mounted() {
        document.addEventListener('keydown', this.handleEscape)
    },

    /**
     * Prepare the component to tbe destroyed.
     */
    destroyed() {
        document.removeEventListener('keydown', this.handleEscape)
    },

    methods: {
        /**
         * Delete the selected resources.
         */
        deleteSelectedResources() {
            this.$emit('deleteSelected')
        },

        /**
         * Force delete the selected resources.
         */
        forceDeleteSelectedResources() {
            this.$emit('forceDeleteSelected')
        },

        /**
         * Delete all of the matching resources.
         */
        deleteAllMatchingResources() {
            this.$emit('deleteAllMatching')
        },

        /**
         * Force delete all of the matching resources.
         */
        forceDeleteAllMatchingResources() {
            this.$emit('forceDeleteAllMatching')
        },

        /**
         * Restore the selected resources.
         */
        restoreSelectedResources() {
            this.$emit('restoreSelected')
        },

        /**
         * Restore all of the matching resources.
         */
        restoreAllMatchingResources() {
            this.$emit('restoreAllMatching')
        },

        /**
         * Handle the escape key press event.
         */
        handleEscape(e) {
            if (this.show && e.keyCode == 27) {
                this.close()
            }
        },

        /**
         * Close the modal.
         */
        close() {
            this.$emit('close')
        },
    },

    computed: {
        /**
         * Determine if any soft deleted resources are selected.
         */
        softDeletedResourcesSelected() {
            return Boolean(_.find(this.selectedResources, resource => resource.softDeleted))
        },

        /**
         * Determine if any selected resources may be deleted.
         */
        authorizedToDeleteSelectedResources() {
            return Boolean(_.find(this.selectedResources, resource => resource.authorizedToDelete))
        },

        /**
         * Determine if any selected resources may be force deleted.
         */
        authorizedToForceDeleteSelectedResources() {
            return Boolean(
                _.find(this.selectedResources, resource => resource.authorizedToForceDelete)
            )
        },

        /**
         * Determine if the user is authorized to delete any listed resource.
         */
        authorizedToDeleteAnyResources() {
            return (
                this.resources.length > 0 &&
                Boolean(_.find(this.resources, resource => resource.authorizedToDelete))
            )
        },

        /**
         * Determine if the user is authorized to force delete any listed resource.
         */
        authorizedToForceDeleteAnyResources() {
            return (
                this.resources.length > 0 &&
                Boolean(_.find(this.resources, resource => resource.authorizedToForceDelete))
            )
        },

        /**
         * Determine if any selected resources may be restored.
         */
        authorizedToRestoreSelectedResources() {
            return Boolean(_.find(this.selectedResources, resource => resource.authorizedToRestore))
        },

        /**
         * Determine if the user is authorized to restore any listed resource.
         */
        authorizedToRestoreAnyResources() {
            return (
                this.resources.length > 0 &&
                Boolean(_.find(this.resources, resource => resource.authorizedToRestore))
            )
        },
    },
}
</script>
