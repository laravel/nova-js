<template>
    <tr>
        <!-- Resource Selection Checkbox -->
        <td :class="{
            'w-16' : actionsAreAvailable,
            'w-8' : !actionsAreAvailable
        }">
            <checkbox
                :data-testid="`${testId}-checkbox`"
                v-if="actionsAreAvailable"
                :checked="checked"
                @input="toggleSelection"
            />
        </td>

        <!-- Fields -->
        <td v-for="field in resource.fields">
            <component
                :is="'index-' + field.component"
                :class="`text-${field.textAlign}`"
                :resource-name="resourceName"
                :via-resource="viaResource"
                :via-resource-id="viaResourceId"
                :field="field"
            />
        </td>

        <td class="td-fit text-right pr-6">
            <!-- View Resource Link -->
            <router-link
                :data-testid="`${testId}-view-button`"
                class="cursor-pointer text-70 hover:text-primary mr-3"
                :to="{ name: 'detail', params: {
                    resourceName: resourceName,
                    resourceId: resource['id'].value
                }}"
            >
                <icon type="view" width="22" height="18" view-box="0 0 22 16" />
            </router-link>

            <span v-if="resource.authorizedToUpdate">
                <!-- Edit Pivot Button -->
                <router-link
                    v-if="relationshipType == 'belongsToMany' || relationshipType == 'morphToMany'"
                    class="cursor-pointer text-70 hover:text-primary mr-3"
                    :to="{
                        name: 'edit-attached',
                        params: {
                            resourceName: viaResource,
                            resourceId: viaResourceId,
                            relatedResourceName: resourceName,
                            relatedResourceId: resource['id'].value
                        },
                        query: {
                            viaRelationship: viaRelationship
                        }
                    }"
                >
                    <icon type="edit" />
                </router-link>

                <!-- Edit Resource Link -->
                <router-link
                    v-else
                    class="cursor-pointer text-70 hover:text-primary mr-3"
                    :to="{ name: 'edit', params: {
                        resourceName: resourceName,
                        resourceId: resource['id'].value
                    }}"
                >
                    <icon type="edit" />
                </router-link>
            </span>

            <!-- Delete Resource Link -->
            <button
                :data-testid="`${testId}-delete-button`"
                class="appearance-none cursor-pointer text-70 hover:text-primary mr-3"
                v-if="resource.authorizedToDelete && ! resource.softDeleted"
                @click.prevent="openDeleteModal"
                :title="viaManyToMany ? 'Detach' : 'Delete'"
            >
                <icon />
            </button>

            <portal to="modals">
                <transition name="fade">
                    <delete-resource-modal
                        v-if="deleteModalOpen"
                        @confirm="confirmDelete"
                        @close="closeDeleteModal"
                        :mode="viaManyToMany ? 'detach' : 'delete'"
                    />
                </transition>
            </portal>

            <button
                class="appearance-none cursor-pointer text-70 hover:text-primary mr-3"
                v-if="resource.authorizedToRestore && resource.softDeleted"
                @click.prevent="restoreResource(resource)"
                title="Restore"
            >
                <icon type="restore" with="20" height="21" />
           </button>
        </td>
    </tr>
</template>

<script>
export default {
    props: [
        'testId',
        'deleteResource',
        'restoreResource',
        'resource',
        'resourcesSelected',
        'resourceName',
        'relationshipType',
        'viaRelationship',
        'viaResource',
        'viaResourceId',
        'viaManyToMany',
        'checked',
        'actionsAreAvailable',
        'updateSelectionStatus',
    ],

    data: () => ({ deleteModalOpen: false }),

    methods: {
        /**
         * Select the resource in the parent component
         */
        toggleSelection() {
            console.log('yep')
            this.updateSelectionStatus(this.resource)
        },

        openDeleteModal() {
            this.deleteModalOpen = true
        },

        confirmDelete() {
            this.deleteResource(this.resource)
            this.closeDeleteModal()
        },

        closeDeleteModal() {
            this.deleteModalOpen = false
        },
    },
}
</script>
