<template>
    <div>
        <div v-if="actions.length > 0 || pivotActions.length > 0" class="mr-3">
            <select
                data-testid="action-select"
                ref="selectBox"
                v-model="selectedActionKey"
                class="form-control form-select mr-2"
            >
                <option value="" disabled selected>Select Action</option>

                <optgroup v-if="actions.length > 0" label="---">
                    <option
                        v-for="action in actions"
                        :value="action.uriKey"
                        :key="action.urikey"
                        :selected="action.uriKey == selectedActionKey"
                    >
                        {{ action.name }}
                    </option>
                </optgroup>

                <optgroup :label="pivotName" v-if="pivotActions.length > 0">
                    <option
                        v-for="action in pivotActions"
                        :value="action.uriKey"
                        :key="action.urikey"
                        :selected="action.uriKey == selectedActionKey"
                    >
                        {{ action.name }}
                    </option>
                </optgroup>
            </select>

            <button
                data-testid="action-confirm"
                @click.prevent="openConfirmationModal"
                :disabled="!selectedAction"
                class="btn btn-default btn-primary"
                :class="{ 'btn-disabled' : !selectedAction }"
            >
                Run
            </button>
        </div>

        <!-- Action Confirmation Modal -->
        <portal to="modals">
            <transition name="fade">
                <confirm-action-modal
                    v-if="confirmActionModalOpened"
                    :resource-name="resourceName"
                    :selected-action="selectedAction"
                    :errors="errors"
                    @confirm="executeAction"
                    @close="confirmActionModalOpened = false"
                />
            </transition>
        </portal>
    </div>
</template>

<script>
import _ from 'lodash'
import { Errors } from '@/mixins'

export default {
    props: {
        selectedResources: {
            type: [Array, String],
            default: () => [],
        },
        resourceName: String,
        actions: {},
        pivotActions: {},
        pivotName: String,
        queryString: {
            type: Object,
            default: () => ({
                currentSearch: '',
                encodedFilters: '',
                currentTrashed: '',
                viaResource: '',
                viaResourceId: '',
                viaRelationship: '',
            }),
        },
    },

    data: () => ({
        errors: new Errors(),
        selectedActionKey: '',
        confirmActionModalOpened: false,
    }),

    watch: {
        /**
         * Watch the actions property for changes.
         */
        actions() {
            this.selectedAction = ''
            this.initializeActionFields()
        },

        /**
         * Watch the pivot actions property for changes.
         */
        pivotActions() {
            this.selectedAction = ''
            this.initializeActionFields()
        },
    },

    methods: {
        /**
         * Confirm with the user that they actually want to run the selected action.
         */
        openConfirmationModal() {
            this.confirmActionModalOpened = true
        },

        /**
         * Close the action confirmation modal.
         */
        closeConfirmationModal() {
            this.confirmActionModalOpened = false
        },

        /**
         * Initialize all of the action fields to empty strings.
         */
        initializeActionFields() {
            _(this.allActions).each(action => {
                _(action.fields).each(field => {
                    field.fill = () => ''
                })
            })
        },

        /**
         * Execute the selected action.
         */
        executeAction() {
            if (this.selectedResources.length == 0) {
                alert('Please select a resource to perform this action on.')
                return
            }

            axios({
                method: 'post',
                url: `/nova-api/${this.resourceName}/action`,
                params: this.actionRequestQueryString,
                data: this.actionFormData(),
            })
                .then(response => {
                    this.confirmActionModalOpened = false
                    this.handleActionResponse(response.data)
                    this.$emit('actionExecuted')
                })
                .catch(error => {
                    if (error.response.status == 422) {
                        this.errors = new Errors(error.response.data.errors)
                    }
                })
        },

        /**
         * Gather the action FormData for the given action.
         */
        actionFormData() {
            return _.tap(new FormData(), formData => {
                formData.append('resources', this.selectedResources)

                _.each(this.selectedAction.fields, field => {
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
    },

    computed: {
        selectedAction() {
            return _.find(this.allActions, a => a.uriKey == this.selectedActionKey)
        },

        /**
         * Get the query string for an action request.
         */
        actionRequestQueryString() {
            return {
                action: this.selectedActionKey,
                pivotAction: this.selectedActionIsPivotAction,
                search: this.queryString.currentSearch,
                filters: this.queryString.encodedFilters,
                trashed: this.queryString.currentTrashed,
                viaResource: this.queryString.viaResource,
                viaResourceId: this.queryString.viaResourceId,
                viaRelationship: this.queryString.viaRelationship,
            }
        },

        /**
         * Determine if the selected action is a pivot action.
         */
        selectedActionIsPivotAction() {
            return (
                this.hasPivotActions &&
                Boolean(_.find(this.pivotActions.actions, a => a === this.selectedAction))
            )
        },

        /**
         * Get all of the available actions.
         */
        allActions() {
            return this.actions.concat(this.pivotActions)
        },

        /**
         * Get all of the available non-pivot actions for the resource.
         */
        availableActions() {
            return _(this.actions)
                .filter(action => {
                    if (this.selectedResources != 'all') {
                        return true
                    }

                    return action.availableForEntireResource
                })
                .value()
        },

        /**
         * Get all of the available pivot actions for the resource.
         */
        availablePivotActions() {
            // if (!this.pivotActions || !this.pivotActions.actions) {
            //     return []
            // }

            return _(this.pivotActions.actions)
                .filter(action => {
                    if (this.selectedResources != 'all') {
                        return true
                    }

                    return action.availableForEntireResource
                })
                .value()
        },
    },
}
</script>
