<template>
    <div v-if="!loading">
        <heading class="mb-3">Edit {{ singularName }}</heading>

        <card class="overflow-hidden">
            <form v-if="fields" @submit.prevent="updateResource">
                <!-- Validation Errors -->
                <validation-errors :errors="validationErrors" />

                <!-- Fields -->
                <div v-for="field in fields">
                    <component
                        :is="'form-' + field.component"
                        :errors="validationErrors"
                        :resource-id="resourceId"
                        :resource-name="resourceName"
                        :field="field"
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
    </div>
</template>

<script>
import { Capitalize, Inflector } from '@/util'
import { Errors } from 'form-backend-validation'

export default {
    props: {
        resourceName: {
            type: String,
            required: true,
        },
        resourceId: {
            required: true,
        },
    },

    data() {
        return {
            loading: true,
            fields: [],
            validationErrors: new Errors(),
            lastRetrievedAt: null,
        }
    },

    watch: {
        /**
         * Retrieve updated resource capabilities when the route changes.
         */
        $route: function() {
            this.getFields()

            this.updateLastRetrievedAtTimestamp()
        },
    },

    created() {
        this.getFields()

        this.updateLastRetrievedAtTimestamp()
    },

    methods: {
        /**
         * Get the available fields for the resource.
         */
        async getFields() {
            this.loading = true

            const { data: fields } = await axios.get(
                `/nova-api/${this.resourceName}/${this.resourceId}/update-fields`
            )

            this.fields = fields

            this.loading = false
        },

        /**
         * Update the resource using the provided data.
         */
        updateResource() {
            axios
                .post(
                    '/nova-api/' + this.resourceName + '/' + this.resourceId,
                    this.updateResourceFormData()
                )
                .then(response => {
                    this.$router.push({
                        name: 'detail',
                        params: {
                            resourceName: this.resourceName,
                            resourceId: this.resourceId,
                        },
                    })
                })
                .catch(error => {
                    if (error.response.status == 422) {
                        this.validationErrors = new Errors(error.response.data.errors)
                    }
                })
        },

        /**
         * Create the form data for creating the resource.
         */
        updateResourceFormData() {
            return _.tap(new FormData(), formData => {
                _(this.fields).each(field => {
                    field.fill(formData)
                })

                formData.append('_method', 'PUT')
                formData.append('_retrieved_at', this.lastRetrievedAt)
            })
        },

        /**
         * Update the last retrieved at timestamp to the current UNIX timestamp.
         */
        updateLastRetrievedAtTimestamp() {
            this.lastRetrievedAt = Math.floor(new Date().getTime() / 1000)
        },
    },

    computed: {
        singularName() {
            return Capitalize(Inflector.singularize(this.resourceName))
        },
    },
}
</script>
