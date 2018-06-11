<template>
    <div>
        <default-field :field-name="`${field.name} Type`">
            <select
                :data-testid="`${field.attribute}-type`"
                slot="field"
                :value="resourceType"
                @change="refreshResourcesForTypeChange"
                class="block w-full form-control form-input form-input-bordered form-select mb-3"
            >
                <option value="" disabled selected>Choose Type</option>

                <option
                    v-for="option in field.morphToTypes"
                    :key="option.value"
                    :value="option.value"
                    :selected="resourceType == option.value"
                >
                    {{ option.display }}
                </option>
            </select>
        </default-field>

        <default-field :field-name="field.name">
            <template slot="field">
                <search-input
                    v-if="isSearchable"
                    :data-testid="`${field.attribute}-search-input`"
                    @input="performSearch"
                    @clear="clearSelection"
                    @selected="selectResource"
                    :value='selectedResource'
                    :data='availableResources'
                    trackBy='value'
                    searchBy='display'
                    class="mb-3"
                >

                    <div slot="default" v-if="selectedResource">
                        {{ selectedResource.display }}
                    </div>

                    <div
                        slot="option"
                        slot-scope="{option, selected}"
                    >
                        {{ option.display }}
                    </div>
                </search-input>

                <select
                    v-else
                    class="form-control form-select mb-3 w-full"
                    :class="{ 'border-danger': hasError, 'opacity-50': !resourceType }"
                    :disabled="!resourceType"
                    @change="selectResourceFromSelectControl"
                >
                    <option
                        value=""
                        disabled
                        :selected="selectedResourceId == ''">Choose {{ field.name }}</option>

                    <option
                        v-for="resource in availableResources"
                        :key="resource.value"
                        :value="resource.value"
                        :selected="selectedResourceId == resource.value"
                    >
                        {{ resource.display}}
                    </option>
                </select>

                <!-- Trashed State -->
                <div v-if="softDeletes">
                    <label class="flex items-center" @input="toggleWithTrashed" @keydown.prevent.space.enter="toggleWithTrashed">
                        <checkbox :checked="withTrashed" />

                        <span class="ml-2">
                            With Trashed
                        </span>
                    </label>
                </div>

                <p v-if="hasError" class="my-2 text-danger">
                    {{ firstError }}
                </p>
            </template>
        </default-field>
    </div>
</template>

<script>
import _ from 'lodash'
import storage from '@/storage/MorphToFieldStorage'
import { PerformsSearches, TogglesTrashed, HandlesValidationErrors } from '@/mixins'

export default {
    mixins: [PerformsSearches, TogglesTrashed, HandlesValidationErrors],
    props: ['resourceName', 'field', 'viaResource', 'viaResourceId', 'viaRelationship'],

    data: () => ({
        resourceType: '',
        initializingWithExistingResource: false,
        softDeletes: false,
        selectedResourceId: null,
        selectedResource: null,
        search: '',
    }),

    /**
     * Mount the component.
     */
    mounted() {
        if (this.editingExistingResource) {
            this.initializingWithExistingResource = true
            this.resourceType = this.field.morphToType
            this.selectedResourceId = this.field.morphToId
        }

        if (this.creatingViaRelatedResource) {
            this.initializingWithExistingResource = true
            this.resourceType = this.viaResource
            this.selectedResourceId = this.viaResourceId
        }

        if (this.shouldSelectInitialResource && !this.isSearchable) {
            this.getAvailableResources().then(() => this.selectInitialResource())
        } else if (this.shouldSelectInitialResource && this.isSearchable) {
            this.getAvailableResources().then(() => this.selectInitialResource())
        }

        if (this.resourceType) {
            this.determineIfSoftDeletes()
        }

        this.field.fill = this.fill
    },

    methods: {
        /**
         * Select a resource using the <select> control
         */
        selectResourceFromSelectControl(e) {
            this.selectedResourceId = e.target.value
            this.selectInitialResource()
        },

        /**
         * Fill the forms formData with details from this field
         */
        fill(formData) {
            if (this.selectedResource) {
                formData.append(this.field.attribute, this.selectedResource.value)
                formData.append(this.field.attribute + '_type', this.resourceType)
                formData.append(this.field.attribute + '_trashed', this.withTrashed)
            }
        },

        /**
         * Get the resources that may be related to this resource.
         */
        getAvailableResources(search = '') {
            return storage
                .fetchAvailableResources(this.resourceName, this.field.attribute, this.queryParams)
                .then(({ data: { resources, softDeletes, withTrashed } }) => {
                    this.initializingWithExistingResource = false
                    this.availableResources = resources
                    this.softDeletes = softDeletes
                })
        },

        /**
         * Select the initial selected resource
         */
        selectInitialResource() {
            this.selectedResource = _.find(
                this.availableResources,
                r => r.value == this.selectedResourceId
            )
        },

        /**
         * Determine if the selected resource type is soft deleting.
         */
        determineIfSoftDeletes() {
            return storage
                .determineIfSoftDeletes(this.resourceType)
                .then(({ data: { softDeletes } }) => (this.softDeletes = softDeletes))
        },

        /**
         * Handle the changing of the resource type.
         */
        async refreshResourcesForTypeChange(event) {
            this.resourceType = event.target.value
            this.availableResources = []
            this.selectedResource = ''
            this.selectedResourceId = ''
            this.withTrashed = false

            // if (this.resourceType == '') {
            this.softDeletes = false
            // } else if (this.field.searchable) {
            this.determineIfSoftDeletes()
            // }

            if (!this.isSearchable) {
                this.getAvailableResources()
            }
        },

        /**
         * Toggle the trashed state of the search
         */
        toggleWithTrashed() {
            this.withTrashed = !this.withTrashed

            // Reload the data if the component doesn't support searching
            if (!this.isSearchable) {
                this.getAvailableResources()
            }
        },
    },

    computed: {
        /**
         * Determine if an existing resource is being updated.
         */
        editingExistingResource() {
            return Boolean(this.field.morphToId && this.field.morphToType)
        },

        /**
         * Determine if we are creating a new resource via a parent relation
         */
        creatingViaRelatedResource() {
            return Boolean(this.viaResource && this.viaResourceId)
        },

        /**
         * Determine if we should select an initial resource when mounting this field
         */
        shouldSelectInitialResource() {
            return Boolean(this.editingExistingResource || this.creatingViaRelatedResource)
        },

        /**
         * Determine if the related resources is searchable
         */
        isSearchable() {
            return Boolean(this.field.searchable)
        },

        shouldLoadFirstResource() {
            return (
                this.isSearchable &&
                this.shouldSelectInitialResource &&
                this.initializingWithExistingResource
            )
        },

        /**
         * Get the query params for getting available resources
         */
        queryParams() {
            return {
                params: {
                    type: this.resourceType,
                    current: this.selectedResourceId,
                    first: this.shouldLoadFirstResource,
                    search: this.search,
                    withTrashed: this.withTrashed,
                },
            }
        },
    },
}
</script>
