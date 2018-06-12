<template>
    <div v-if="resourceResponse" class="select-none">
        <heading class="mb-3">
            <router-link
                :to="{
                    name: 'index',
                    params: {
                        'resourceName': resourceName
                    }
                }"
                class="no-underline text-primary font-bold dim"
                data-testid="lens-back"
            >
                &larr;
            </router-link>

            <span class="px-2 text-70">/</span>

            {{ resourceResponse.name }}
        </heading>

        <card>
            <div class="py-3 flex items-center border-b border-50">
                <div class="px-3" v-if="resources.length > 0 && actionsAreAvailable && ! viaHasOne">
                    <!-- Select All -->
                    <dropdown width="250" active-class="" class="h-9 flex items-center">
                        <div slot="default" class="flex items-center">
                            <fake-checkbox :checked="selectAllChecked" />
                        </div>

                        <div slot="menu">
                            <div class="p-4">
                                <ul class="list-reset">
                                    <li class="flex items-center mb-6">
                                        <checkbox
                                            @input="() => toggleSelectAll()"
                                            :checked="selectAllChecked"
                                        >
                                            <span class="ml-3">Select All</span>
                                        </checkbox>
                                    </li>
                                    <li class="flex items-center">
                                        <checkbox
                                            @input="() => toggleSelectAllMatching()"
                                            :checked="selectAllMatchingChecked"
                                        >
                                            <span class="ml-3">
                                                Select All Matching
                                                <span>({{ allMatchingResourceCount }})</span>
                                            </span>
                                        </checkbox>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </dropdown>
                </div>

                <div class="flex items-center ml-auto px-3">

                    <!-- Action Selector -->
                    <action-selector
                        v-if="selectedResources.length > 0"
                        :resource-name="resourceName"
                        :actions="actions"
                        :pivot-actions="pivotActions"
                        :pivot-name="pivotName"
                        :errors="actionValidationErrors"
                        :selected-resources="selectedResourcesForActionSelector"
                        @actionExecuted="getResources"
                    />

                    <dropdown direction="rtl" width="290" class="dropdown-alt" :dark="true">
                        <icon type="filter" class="text-80" />

                        <div slot="menu">
                            <!-- Filters -->
                            <filter-selector
                                :filters="filters"
                                :current-filters.sync="currentFilters"
                                @changed="filterChanged"
                                v-if="! viaHasOne">
                            </filter-selector>

                            <!-- Per Page -->
                            <filter-select v-if="!viaResource">
                                <h3 slot="default" class="text-sm uppercase tracking-wide text-80 bg-30 p-3">
                                    Per Page:
                                </h3>

                                <select slot="select"
                                    class="block w-full form-control-sm form-select"
                                    v-model="perPage" @change="perPageChanged"
                                >
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </filter-select>
                        </div>
                    </dropdown>

                    <dropdown v-if="selectedResources.length" direction="rtl" width="250" class="dropdown-alt ml-3">
                        <icon type="delete" class="text-80" />

                        <div class="px-6 py-3" slot="menu">
                            <delete-menu
                                :soft-deletes="softDeletes"
                                :resources="resources"
                                :selected-resources="selectedResources"
                                :via-many-to-many="viaManyToMany"
                                @deleteSelected="deleteSelectedResources"
                                @deleteAllMatching="deleteAllMatchingResources"
                                @forceDeleteSelected="forceDeleteSelectedResources"
                                @forceDeleteAllMatching="forceDeleteAllMatchingResources"
                                @restoreSelected="restoreSelectedResources"
                                @restoreAllMatching="restoreAllMatchingResources"
                                @close="deleteModalOpened = false"
                            />
                        </div>
                    </dropdown>
                </div>
            </div>

            <div v-if="!resources.length" class="flex justify-center items-center px-6 py-8">
                <div class="text-center">
                    <svg class="mb-3" xmlns="http://www.w3.org/2000/svg" width="65" height="51" viewBox="0 0 65 51"><g id="Page-1" fill="none" fill-rule="evenodd"><g id="05-blank-state" fill="#A8B9C5" fill-rule="nonzero" transform="translate(-779 -695)"><path id="Combined-Shape" d="M835 735h2c.552285 0 1 .447715 1 1s-.447715 1-1 1h-2v2c0 .552285-.447715 1-1 1s-1-.447715-1-1v-2h-2c-.552285 0-1-.447715-1-1s.447715-1 1-1h2v-2c0-.552285.447715-1 1-1s1 .447715 1 1v2zm-5.364125-8H817v8h7.049375c.350333-3.528515 2.534789-6.517471 5.5865-8zm-5.5865 10H785c-3.313708 0-6-2.686292-6-6v-30c0-3.313708 2.686292-6 6-6h44c3.313708 0 6 2.686292 6 6v25.049375c5.053323.501725 9 4.765277 9 9.950625 0 5.522847-4.477153 10-10 10-5.185348 0-9.4489-3.946677-9.950625-9zM799 725h16v-8h-16v8zm0 2v8h16v-8h-16zm34-2v-8h-16v8h16zm-52 0h16v-8h-16v8zm0 2v4c0 2.209139 1.790861 4 4 4h12v-8h-16zm18-12h16v-8h-16v8zm34 0v-8h-16v8h16zm-52 0h16v-8h-16v8zm52-10v-4c0-2.209139-1.790861-4-4-4h-44c-2.209139 0-4 1.790861-4 4v4h52zm1 39c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8z"/></g></g></svg>

                    <h3 class="text-base text-80 font-normal mb-6">
                        No {{resourceName}} matched the given criteria.
                    </h3>

                    <create-resource-button
                        classes="btn btn-sm btn-outline"
                        :singular-name="singularName"
                        :resource-name="resourceName"
                        :via-resource="viaResource"
                        :via-resource-id="viaResourceId"
                        :via-relationship="viaRelationship"
                        :relationship-type="relationshipType"
                        :authorized-to-create="authorizedToCreate && ! resourceIsFull"
                        :authorized-to-relate="authorizedToRelate"
                    />
                </div>
            </div>

            <!-- Resource Table -->
            <resource-table
                :authorized-to-relate="authorizedToRelate"
                :resource-name="resourceName"
                :resources="resources"
                :singular-name="singularName"
                :selected-resources="selectedResources"
                :selected-resource-ids="selectedResourceIds"
                :resource-counter="getAllMatchingResourceCount"
                :actions-are-available="allActions.length > 0"
                :via-resource="viaResource"
                :via-resource-id="viaResourceId"
                :via-relationship="viaRelationship"
                :relationship-type="relationshipType"
                :update-selection-status="updateSelectionStatus"
                @order="orderByField"
                @delete="deleteResources"
                @restore="restoreResources"
                ref="resourceTable">
            </resource-table>

            <!-- Pagination -->
            <pagination-links
                :resources="resources"
                :resource-response="resourceResponse"
                @previous="selectPreviousPage"
                @next="selectNextPage">
            </pagination-links>
        </card>
    </div>
</template>

<script>
import { Errors } from 'form-backend-validation'
import { Capitalize, Inflector } from '@/util'

import {
    Deletable,
    Filterable,
    Paginatable,
    PerPageable,
    InteractsWithQueryString,
    InteractsWithResourceInformation,
} from '@/mixins'

export default {
    mixins: [
        Deletable,
        Filterable,
        Paginatable,
        PerPageable,
        InteractsWithResourceInformation,
        InteractsWithQueryString,
    ],

    props: {
        resourceName: {
            type: String,
            required: true,
        },
        viaResource: {
            default: '',
        },
        viaResourceId: {
            default: '',
        },
        viaRelationship: {
            default: '',
        },
        relationshipType: {
            type: String,
            default: '',
        },
        lens: {},
    },

    data() {
        return {
            resourceResponse: null,
            resources: [],
            softDeletes: false,
            selectedResources: [],
            selectAllMatchingResources: false,

            deleteModalOpened: false,

            actions: [],
            pivotActions: null,
            actionValidationErrors: new Errors(),

            filters: [],

            authorizedToRelate: false,

            orderBy: '',
            orderByDirection: '',
            trashed: '',
        }
    },

    watch: {
        /**
         * Retrieve updated resource capabilities when the route changes.
         */
        $route: function() {
            this.softDeletes = false
            this.getAuthorizationToRelate()
            this.getActions()
            this.getFilters()
        },
    },

    /**
     * Mount the component and retrieve its initial data.
     */
    created() {
        this.initializeSearchFromQueryString()
        this.initializePerPageFromQueryString()
        this.initializeTrashedFromQueryString()
        this.initializeOrderingFromQueryString()

        this.getResources()
        this.getAuthorizationToRelate()
        this.getActions()
        this.getFilters()

        this.$watch(
            () => {
                return (
                    this.resourceName +
                    this.encodedFilters +
                    this.currentSearch +
                    this.currentPage +
                    this.currentPerPage +
                    this.currentOrderBy +
                    this.currentOrderByDirection +
                    this.currentTrashed
                )
            },
            () => {
                this.getResources()

                this.initializeSearchFromQueryString()
                this.initializePerPageFromQueryString()
                this.initializeTrashedFromQueryString()
                this.initializeOrderingFromQueryString()
                this.initializeFilterValuesFromQueryString()
            }
        )
    },

    methods: {
        selectAllResources() {
            this.selectedResources = this.resources.slice(0)
        },

        toggleSelectAll() {
            if (this.selectAllChecked) return this.clearResourceSelections()
            this.selectAllResources()
        },

        toggleSelectAllMatching() {
            if (!this.selectAllMatchingResources) {
                this.selectAllResources()
                this.selectAllMatchingResources = true

                return
            }

            this.selectAllMatchingResources = false
        },

        /*
         * Update the resource selection status
         */
        updateSelectionStatus(resource) {
            if (!_(this.selectedResources).includes(resource))
                return this.selectedResources.push(resource)
            const index = this.selectedResources.indexOf(resource)
            if (index > -1) return this.selectedResources.splice(index, 1)
        },

        /**
         * Get the resources based on the current page, search, filters, etc.
         */
        async getResources() {
            this.clearResourceSelections()

            const { data } = await axios.get(
                '/nova-api/' + this.resourceName + '/lens/' + this.lens,
                { params: this.resourceRequestQueryString }
            )

            this.resourceResponse = data
            this.resources = data.resources
            this.softDeletes = data.softDeletes
        },

        /**
         * Get the relatable authorization status for the resource.
         */
        getAuthorizationToRelate() {
            if (!this.authorizedToCreate) {
                return
            }
            if (!this.viaResource) {
                return (this.authorizedToRelate = true)
            }
            axios
                .get(
                    '/nova-api/' +
                        this.resourceName +
                        '/relate-authorization' +
                        '?viaResource=' +
                        this.viaResource +
                        '&viaResourceId=' +
                        this.viaResourceId +
                        '&viaRelationship=' +
                        this.viaRelationship
                )
                .then(response => {
                    this.authorizedToRelate = response.data.authorized
                })
        },

        /**
         * Get the actions available for the current resource.
         */
        getActions() {
            this.actions = []
            this.pivotActions = null
            axios
                .get(
                    '/nova-api/' +
                        this.resourceName +
                        '/actions' +
                        '?viaResource=' +
                        this.viaResource +
                        '&viaResourceId=' +
                        this.viaResourceId +
                        '&viaRelationship=' +
                        this.viaRelationship
                )
                .then(response => {
                    this.actions = _.filter(response.data.actions, action => {
                        return !action.onlyOnDetail
                    })
                    this.pivotActions = response.data.pivotActions
                })
        },

        /**
         * Get the filters available for the current resource.
         */
        getFilters() {
            this.filters = []
            this.currentFilters = []
            axios.get('/nova-api/' + this.resourceName + '/filters').then(response => {
                this.filters = response.data
                this.initializeFilterValuesFromQueryString()
            })
        },

        /**
         * Clear the selected resouces and the "select all" states.
         */
        clearResourceSelections() {
            this.selectAllMatchingResources = false
            this.selectedResources = []
        },

        /**
         * Get the count of all of the matching resources.
         */
        async getAllMatchingResourceCount() {
            const { data: { count } } = await axios.get(
                '/nova-api/' + this.resourceName + '/lens/' + this.lens + '/count',
                { params: this.resourceRequestQueryString }
            )

            return count
        },

        /**
         * Sort the resources by the given field.
         */
        orderByField(field) {
            var direction = this.currentOrderByDirection == 'asc' ? 'desc' : 'asc'
            if (this.currentOrderBy != field.attribute) {
                direction = 'asc'
            }
            this.updateQueryString({
                [this.orderByParameter]: field.attribute,
                [this.orderByDirectionParameter]: direction,
            })
        },

        /**
         * Sync the current search value from the query string.
         */
        initializeSearchFromQueryString() {
            this.search = this.currentSearch
        },

        /**
         * Sync the current order by values from the query string.
         */
        initializeOrderingFromQueryString() {
            this.orderBy = this.currentOrderBy
            this.orderByDirection = this.currentOrderByDirection
        },

        /**
         * Sync the trashed state values from the query string.
         */
        initializeTrashedFromQueryString() {
            this.trashed = this.currentTrashed
        },

        /**
         * Update the trashed constraint for the resource listing.
         */
        trashedChanged() {
            this.updateQueryString({ [this.trashedParameter]: this.trashed })
        },
    },

    asyncComputed: {
        allMatchingResourceCount: {
            get() {
                return new Promise((resolve, reject) => {
                    return resolve(this.getAllMatchingResourceCount())
                })
            },
            default: 0,
        },
    },

    computed: {
        /**
         * Get the endpoint for this resource's metrics.
         */
        metricsEndpoint() {
            return `/nova-api/${this.resourceName}/metrics`
        },

        /**
         * Get the name of the filter query string variable.
         */
        filterParameter() {
            return this.resourceName + '_filter'
        },

        /**
         * Get the name of the search query string variable.
         */
        searchParameter() {
            return this.resourceName + '_search'
        },

        /**
         * Get the name of the order by query string variable.
         */
        orderByParameter() {
            return this.resourceName + '_order'
        },

        /**
         * Get the name of the order by direction query string variable.
         */
        orderByDirectionParameter() {
            return this.resourceName + '_direction'
        },

        /**
         * Get the name of the trashed constraint query string variable.
         */
        trashedParameter() {
            return this.resourceName + '_trashed'
        },

        /**
         * Get the name of the per page query string variable.
         */
        perPageParameter() {
            return this.resourceName + '_per_page'
        },

        /**
         * Get the name of the page query string variable.
         */
        pageParameter() {
            return this.resourceName + '_page'
        },

        /**
         * Build the resource request query string.
         */
        resourceRequestQueryString() {
            return {
                search: this.currentSearch,
                filters: this.encodedFilters,
                orderBy: this.currentOrderBy,
                orderByDirection: this.currentOrderByDirection,
                perPage: this.currentPerPage,
                page: this.currentPage,
                viaResource: this.viaResource,
                viaResourceId: this.viaResourceId,
                // viaRelationship: this.viaRelationship,
                viaResourceRelationship: this.viaResourceRelationship,
                relationshipType: this.relationshipType,
            }
        },

        /**
         * Determine if all resources are selected.
         */
        selectAllChecked() {
            return this.selectedResources.length == this.resources.length
        },

        /**
         * Determine if all matching resources are selected.
         */
        selectAllMatchingChecked() {
            return (
                this.selectedResources.length == this.resources.length &&
                this.selectAllMatchingResources
            )
        },

        /**
         * Get the IDs for the selected resources.
         */
        selectedResourceIds() {
            return _.map(this.selectedResources, resource => resource.id.value)
        },

        /**
         * Get all of the actions available to the resource.
         */
        allActions() {
            return this.hasPivotActions
                ? this.actions.concat(this.pivotActions.actions)
                : this.actions
        },

        /**
         * Determine if the resource has any pivot actions available.
         */
        hasPivotActions() {
            return this.pivotActions && this.pivotActions.actions.length > 0
        },

        /**
         * Determine if the resource has any actions available.
         */
        actionsAreAvailable() {
            return this.allActions.length > 0
        },

        /**
         * Get the name of the pivot model for the resource.
         */
        pivotName() {
            return this.pivotActions ? this.pivotActions.name : ''
        },

        /**
         * Get the current search value from the query string.
         */
        currentSearch() {
            return this.$route.query[this.searchParameter] || ''
        },

        /**
         * Get the current order by value from the query string.
         */
        currentOrderBy() {
            return this.$route.query[this.orderByParameter] || ''
        },

        /**
         * Get the current order by direction from the query string.
         */
        currentOrderByDirection() {
            return this.$route.query[this.orderByDirectionParameter] || 'desc'
        },

        /**
         * Get the current trashed constraint value from the query string.
         */
        currentTrashed() {
            return this.$route.query[this.trashedParameter] || ''
        },

        /**
         * Determine if the current resource listing is via a many-to-many relationship.
         */
        viaManyToMany() {
            return (
                this.relationshipType == 'belongsToMany' || this.relationshipType == 'morphToMany'
            )
        },

        /**
         * Determine if the resource / relationship is "full".
         */
        resourceIsFull() {
            return this.viaHasOne && this.resources.length > 0
        },

        /**
         * Determine if the current resource listing is via a has-one relationship.
         */
        viaHasOne() {
            return this.relationshipType == 'hasOne' || this.relationshipType == 'morphOne'
        },

        /**
         * Get the singular name for the resource
         */
        singularName() {
            return Capitalize(Inflector.singularize(this.resourceName))
        },

        /**
         * Get the selected resources for the action selector.
         */
        selectedResourcesForActionSelector() {
            return this.selectAllMatchingChecked ? 'all' : this.selectedResourceIds
        },
    },
}
</script>
