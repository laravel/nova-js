<template>
    <span v-if="shouldShowAttachButton || shouldShowCreateButton" class="ml-auto">
        <!-- Attach Related Models -->
        <router-link
            v-if="shouldShowAttachButton"
            :class="classes"
            tag="button"
            :to="{
                name: 'attach',
                params: {
                    resourceName: viaResource,
                    resourceId: viaResourceId,
                    relatedResourceName: resourceName
                },
                query: {
                    viaRelationship: viaRelationship,
                    polymorphic: relationshipType == 'morphToMany' ? '1' : '0'
                }
            }"
        >
            Attach {{singularName}}
        </router-link>

        <!-- Create Related Models -->
        <router-link
            v-else-if="shouldShowCreateButton"
            :class="classes"
            tag="button"
            :to="{
                name: 'create',
                params: {
                    resourceName: resourceName
                },
                query: {
                    viaResource: viaResource,
                    viaResourceId: viaResourceId,
                    viaRelationship: viaRelationship
                }
            }"
        >
            Create {{singularName}}
        </router-link>
    </span>
</template>

<script>
export default {
  props: {
    'classes': { default: 'btn btn-default btn-primary'},
    'singularName': {},
    'resourceName': {},
    'viaResource': {},
    'viaResourceId': {},
    'viaRelationship': {},
    'relationshipType': {},
    'authorizedToCreate': {},
    'authorizedToRelate': {},
  },

  computed: {
    /**
     * Determine if the attach button should be displayed.
     */
    shouldShowAttachButton() {
      return (
        (this.relationshipType == 'belongsToMany' || this.relationshipType == 'morphToMany') &&
        this.authorizedToRelate
      )
    },

    /**
     * Determine if the create button should be displayed.
     */
    shouldShowCreateButton() {
      return this.authorizedToCreate && this.authorizedToRelate
    },
  },
}
</script>
