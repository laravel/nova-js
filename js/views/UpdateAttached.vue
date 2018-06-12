<template>
    <card class="overflow-hidden">
        <form v-if="availableResources" @submit.prevent="updateAttachedResource">
            <!-- Validation Errors -->
            <!-- <validation-errors :errors="validationErrors" /> -->

            <!-- Related Resource -->
            <field-wrapper>
                <div class="w-1/5 px-8 py-6">
                    <slot>
                        <form-label>
                            {{ relatedResourceLabel }}
                        </form-label>
                    </slot>
                </div>
                <div class="w-1/2 px-8 py-6">
                    <search-input
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

                        <div slot="option" slot-scope="{option, selected}">
                            {{ option.display }}
                        </div>
                    </search-input>

                    <!-- With Trashed Checkbox -->
                    <div v-if="softDeletes">
                        <label @click="toggleWithTrashed" class="flex items-center">
                            <checkbox :checked="withTrashed"></checkbox>

                            <span class="ml-2">
                                With Trashed
                            </span>
                        </label>
                    </div>

                    <p v-if="true" class="my-2 text-danger">
                        {{ validationErrors.first(relatedResourceName) }}
                    </p>
                </div>
            </field-wrapper>

            <!-- Pivot Fields -->
            <div v-for="field in fields">
                <component
                    :is="'form-' + field.component"
                    :resource-name="resourceName"
                    :field="field"
                    :errors="validationErrors"
                    :via-relationship="viaRelationship"
                />

            </div>

            <!-- Update Button -->
            <div class="bg-30 flex px-8 py-4">
                <button class="ml-auto btn btn-default btn-primary">
                    Update
                </button>
            </div>
        </form>
    </card>
</template>

<script>
import { Errors, PerformsSearches, TogglesTrashed } from '@/mixins'

export default {
    mixins: [PerformsSearches, TogglesTrashed],

    props: {
        resourceName: {
            type: String,
            required: true,
        },
        resourceId: {
            required: true,
        },
        relatedResourceName: {
            type: String,
            required: true,
        },
        relatedResourceId: {
            required: true,
        },
        viaRelationship: {
            default: '',
        },
    },

    data() {
        return {
            fields: [],
            softDeletes: false,
            validationErrors: new Errors(),
            lastRetrievedAt: null
        }
    },

    /**
     * Mount the component.
     */
    mounted() {
        this.initializeComponent()

        this.$watch(
            () => {
                return (
                    this.resourceName +
                    this.resourceId +
                    this.relatedResourceName +
                    this.relatedResourceId
                )
            },
            () => {
                this.initializeComponent()
            }
        )
    },

    methods: {
        /**
         * Initialize the component.
         */
        async initializeComponent() {
            await this.getAvailableResources()
            await this.getPivotFields()
            this.selectInitialResource()
            this.updateLastRetrievedAtTimestamp();
        },

        /**
         * Get the available resources (pulling only a single record).
         */
        async getAvailableResources(search = '') {
            this.availableResources = []

            const {
                data: { resources, withTrashed },
            } = await axios.get(
                `/nova-api/${this.resourceName}/${this.resourceId}/attachable/${
                    this.relatedResourceName
                }`,
                { params: { search, current: this.relatedResourceId, first: true } }
            )

            this.availableResources = resources
            this.withTrashed = withTrashed
        },

        /**
         * Get all of the available pivot fields for the relationship.
         */
        async getPivotFields() {
            this.fields = []

            const { data } = await axios.get(
                `/nova-api/${this.resourceName}/${this.resourceId}/update-pivot-fields/${
                    this.relatedResourceName
                }/${this.relatedResourceId}`,
                { params: { viaRelationship: this.viaRelationship } }
            )

            this.fields = data

            _.each(this.fields, field => {
                field.fill = () => ''
            })
        },

        /**
         * Update the attached resource.
         */
        async updateAttachedResource() {
            try {
                await axios.post(
                    `/nova-api/${this.resourceName}/${this.resourceId}/update-attached/${
                        this.relatedResourceName
                    }/${this.relatedResourceId}`,
                    this.updateAttachmentFormData()
                )

                this.$router.push({
                    name: 'detail',
                    params: {
                        resourceName: this.resourceName,
                        resourceId: this.resourceId,
                    },
                })
            } catch (error) {
                if (error.response.status == 422) {
                    this.validationErrors = new Errors(error.response.data.errors)
                }
            }
        },

        /**
         * Get the form data for the resource attachment update.
         */
        updateAttachmentFormData() {
            return _.tap(new FormData(), formData => {
                _.each(this.fields, field => {
                    field.fill(formData)
                })

                formData.append('viaRelationship', this.viaRelationship)
                formData.append(this.relatedResourceName, this.selectedResource.value)
                formData.append(this.relatedResourceName + '_trashed', this.withTrashed)
                formData.append('_retrieved_at', this.lastRetrievedAt)
            })
        },

        /**
         * Select the initial selected resource
         */
        selectInitialResource() {
            this.selectedResource = _(this.availableResources).first(
                resource => resource.value == this.relatedResourceId
            )
        },

        /**
         * Update the last retrieved at timestamp to the current UNIX timestamp.
         */
        updateLastRetrievedAtTimestamp() {
            this.lastRetrievedAt = Math.floor((new Date()).getTime() / 1000);
        }
    },

    computed: {
        /**
         * Get the label for the related resource.
         */
        relatedResourceLabel() {
            return _.find(Nova.resources, resource => {
                return resource.uriKey == this.relatedResourceName
            }).singularLabel
        },
    },
}
</script>
