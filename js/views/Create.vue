<template>
    <div>
        <heading class="mb-3">New {{ singularName }}</heading>

        <card class="overflow-hidden">
            <form v-if="fields" @submit.prevent="createResource">
                <!-- Validation Errors -->
                <validation-errors :errors="validationErrors"/>

                <!-- Fields -->
                <div v-for="field in fields">
                    <component
                        :is="'form-' + field.component"
                        :errors="validationErrors"
                        :resource-name="resourceName"
                        :field="field"
                        :via-resource="viaResource"
                        :via-resource-id="viaResourceId"
                        :via-relationship="viaRelationship"
                    />
                </div>

                <!-- Create Button -->
                <div class="bg-30 flex px-8 py-4">
                    <button class="ml-auto btn btn-default btn-primary">
                        Create
                    </button>
                </div>
            </form>
        </card>
    </div>
</template>

<script>
import { Errors } from '@/mixins'
import { Capitalize, Inflector } from '@/util'

export default {
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
    },

    data: () => ({
        fields: [],
        validationErrors: new Errors(),
    }),

    watch: {
        /**
         * Retrieve updated resource capabilities when the route changes.
         */
        $route: () => {
            this.getFields()
        },
    },

    /**
     * Mount the component.
     */
    mounted() {
        this.getFields()
    },

    methods: {
        /**
         * Get the available fields for the resource.
         */
        async getFields() {
            const { data: fields } = await axios.get(
                `/nova-api/${this.resourceName}/creation-fields`
            )

            this.fields = fields
        },

        /**
         * Create a new resource instance using the provided data.
         */
        createResource() {
            axios
                .post('/nova-api/' + this.resourceName, this.createResourceFormData())
                .then(response => {
                    this.$router.push({
                        name: 'detail',
                        params: {
                            resourceName: this.resourceName,
                            resourceId: response.data.id,
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
        createResourceFormData() {
            return _.tap(new FormData(), formData => {
                _.each(this.fields, field => {
                    field.fill(formData)
                })

                formData.append('viaResource', this.viaResource)
                formData.append('viaResourceId', this.viaResourceId)
                formData.append('viaRelationship', this.viaRelationship)
            })
        },
    },

    computed: {
        singularName() {
            return Capitalize(Inflector.singularize(this.resourceName))
        },
    },
}
</script>
