<template>
    <div v-if="resource">
        <!-- Resource Detail -->
        <div class="mb-8" :key="panel.id" v-for="panel in availablePanels">
            <component
                :is="panel.component"
                :resource-name="resourceName"
                :resource-id="resourceId"
                :resource="resource"
                :panel="panel"
                @actionExecuted="actionExecuted"
            >
                <div v-if="panel.name.includes('Details')" class="flex items-center mb-3">
                    <h4 class="text-90 font-normal text-2xl">{{ panel.name }}</h4>

                    <div class="ml-auto flex">

                        <!-- Actions -->
                        <action-selector
                            v-if="resource"
                            :resource-name="resourceName"
                            :actions="actions"
                            :pivot-actions="[]"
                            :errors="actionValidationErrors"
                            :selected-resources="selectedResources"
                            :query-string="{
                                currentSearch,
                                encodedFilters,
                                currentTrashed,
                                viaResource,
                                viaResourceId,
                                viaRelationship
                            }"
                        />

                        <button
                            data-testid="open-delete-modal"
                            @click="openDeleteModal"
                            class="btn btn-default btn-icon mr-3"
                        >
                            <icon type="delete" class="text-80" />
                        </button>

                        <portal to="modals">
                            <transition name="fade">
                                <delete-resource-modal
                                    v-if="deleteModalOpen"
                                    @confirm="confirmDelete"
                                    @close="closeDeleteModal"
                                    mode="delete"
                                />
                            </transition>
                        </portal>

                        <router-link
                            data-testid="edit-resource"
                            :to="{ name: 'edit', params: {id: resource.id} }"
                            class="btn btn-default btn-primary">
                            Edit
                        </router-link>
                    </div>
                </div>
            </component>
        </div>
    </div>
</template>

<script>
import { Deletable } from '@/mixins'
import { Errors } from 'form-backend-validation'

export default {
    props: ['resourceName', 'resourceId'],

    mixins: [Deletable],

    data() {
        return {
            resource: null,
            panels: [],
            actions: [],
            actionValidationErrors: new Errors(),
            deleteModalOpen: false,
        }
    },

    /**
     * Mount the component.
     */
    mounted() {
        this.initializeComponent()

        this.$watch(
            () => {
                return this.resourceName + this.resourceId
            },
            () => {
                this.initializeComponent()
            }
        )
    },

    methods: {
        /**
         * Initialize the compnent's data.
         */
        initializeComponent() {
            this.getResource()
            this.getActions()
        },

        /**
         * Get the resource information.
         */
        getResource() {
            this.resource = null

            axios.get('/nova-api/' + this.resourceName + '/' + this.resourceId).then(response => {
                this.panels = response.data.panels
                this.resource = response.data.resource
            })
        },

        /**
         * Get the available actions for the resource.
         */
        getActions() {
            this.actions = []

            axios.get('/nova-api/' + this.resourceName + '/actions').then(response => {
                this.actions = response.data.actions
            })
        },

        /**
         * Execute the selected action.
         */
        executeAction(action) {
            if (!action) {
                return
            }

            axios
                .post(
                    '/nova-api/' + this.resourceName + '/action' + '?action=' + action.uriKey,
                    this.actionFormData(action)
                )
                .then(response => {
                    this.$refs.actionSelector[0].closeConfirmationModal()
                    this.handleActionResponse(response.data)
                })
                .catch(error => {
                    console.log(error)
                    if (error.response.status == 422) {
                        this.actionValidationErrors = new Errors(error.response.data.errors)
                    }
                })
        },

        /**
         * Gather the action FormData for the given action.
         */
        actionFormData(action) {
            return _.tap(new FormData(), formData => {
                formData.append('resources', this.resource.id.value)

                _.each(action.fields, field => {
                    field.fill(formData)
                })
            })
        },

        /**
         * Handle the action response. Typically either a message or a download.
         */
        handleActionResponse(response) {
            if (response.message) {
                alert(response.message)
            } else if (response.download) {
                window.location = response.download
            }
        },

        /**
         * Handle an action executed event.
         */
        actionExecuted() {
            this.getResource()
        },

        /**
         * Create a new panel for the given field.
         */
        createPanelForField(field) {
            return _.tap(_.find(this.panels, panel => panel.name == field.panel), panel => {
                panel.fields = [field]
            })
        },

        /**
         * Create a new panel for the given relationship field.
         */
        createPanelForRelationship(field) {
            return {
                component: 'relationship-panel',
                prefixComponent: true,
                name: field.name,
                fields: [field],
            }
        },

        /**
         * Show the confirmation modal for deleting or detaching a resource
         */
        async confirmDelete() {
            await this.deleteResources([this.resource])
            this.$router.push({ name: 'index', params: { resourceName: this.resourceName } })
        },

        /**
         * Open the delete modal
         */
        openDeleteModal() {
            this.deleteModalOpen = true
        },

        /**
         * Close the delete modal
         */
        closeDeleteModal() {
            this.deleteModalOpen = false
        },
    },

    computed: {
        /**
         * Get the available field panels.
         */
        availablePanels() {
            var panels = {}

            var fields = _.toArray(JSON.parse(JSON.stringify(this.resource.fields)))

            fields.forEach(field => {
                if (field.listable) {
                    return (panels[field.name] = this.createPanelForRelationship(field))
                } else if (panels[field.panel]) {
                    return panels[field.panel].fields.push(field)
                }

                panels[field.panel] = this.createPanelForField(field)
            })

            return _.toArray(panels)
        },

        /**
         * These are here to satisfy the parameter requirements for deleting the resource
         */
        currentSearch() {
            return ''
        },

        encodedFilters() {
            return []
        },

        currentTrashed() {
            return ''
        },

        viaResource() {
            return ''
        },

        viaResourceId() {
            return ''
        },

        viaRelationship() {
            return ''
        },

        selectedResources() {
            return [this.resourceId]
        },
    },
}
</script>
