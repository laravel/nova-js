<template>
    <default-field :field-name="field.name">
        <template slot="field">
            <div v-if="hasValue" class="mb-6">
                <template v-if="shouldShowLoader">
                    <ImageLoader :src="field.thumbnailUrl" class="max-w-xs" @missing="(value) => missing = value" />
                </template>

                <template v-if="field.value && !field.thumbnailUrl">
                    <card class="flex item-center relative border border-lg border-50 overflow-hidden p-4">
                        {{ field.value }}

                        <DeleteButton
                            class="ml-auto"
                            v-if="shouldShowRemoveButton"
                            @click="confirmRemoval"
                        />
                    </card>
                </template>

                <p
                    v-if="field.thumbnailUrl"
                    class="mt-3 flex items-center text-sm"
                >
                    <DeleteButton
                        v-if="shouldShowRemoveButton"
                        @click="confirmRemoval"
                    >
                        <span class="class ml-2 mt-1">
                            Delete
                        </span>
                    </DeleteButton>
                </p>

                <portal to="modals">
                    <transition name="fade">
                        <confirm-upload-removal-modal
                            v-if="removeModalOpen"
                            @confirm="removeFile"
                            @close="closeRemoveModal"
                        />
                    </transition>
                </portal>
            </div>

            <span class="form-file mr-4">
                <input
                    ref="fileField"
                    class="form-file-input"
                    type="file"
                    :id="idAttr"
                    name="name"
                    @change="fileChange"
                />
                <label :for="labelFor" class="form-file-btn btn btn-default btn-primary">
                    Choose File
                </label>
            </span>

            <span class="text-gray-50">
                {{ currentLabel }}
            </span>

            <p v-if="hasError" class="my-2 text-danger">
                {{ firstError }}
            </p>
        </template>
    </default-field>
</template>

<script>
import axios from 'axios'
import ImageLoader from '@/components/ImageLoader'
import DeleteButton from '@/components/DeleteButton'
import { FormField, HandlesValidationErrors } from '@/mixins'

export default {
    mixins: [HandlesValidationErrors, FormField],

    components: { DeleteButton, ImageLoader },

    data: () => ({
        file: null,
        label: 'no file selected',
        fileName: '',
        removeModalOpen: false,
        missing: false,
        deleted: false,
    }),

    mounted() {
        this.field.fill = formData => {
            formData.append(this.field.attribute, this.file, this.fileName)
        }
    },

    methods: {
        /**
         * Responsd to the file change
         */
        fileChange(event) {
            let path = event.target.value
            let fileName = path.match(/[^\\/]*$/)[0]
            this.fileName = fileName
            this.file = this.$refs.fileField.files[0]
        },

        /**
         * Confirm removal of the linked file
         */
        confirmRemoval() {
            this.removeModalOpen = true
        },

        /**
         * Close the upload removal modal
         */
        closeRemoveModal() {
            this.removeModalOpen = false
        },

        /**
         * Remove the linked file from storage
         */
        async removeFile() {
            const { resourceName, resourceId } = this
            const attribute = this.field.attribute

            try {
                await axios.delete(`/nova-api/${resourceName}/${resourceId}/field/${attribute}`)
                this.closeRemoveModal()
                this.deleted = true
            } catch (error) {
                this.closeRemoveModal()
            }
        },
    },

    computed: {
        currentLabel() {
            return this.fileName || this.label
        },

        idAttr() {
            return this.labelFor
        },

        labelFor() {
            return `file-${this.field.attribute}`
        },

        hasValue() {
            return (
                Boolean(this.field.value || this.field.thumbnailUrl) &&
                !Boolean(this.deleted) &&
                !Boolean(this.missing)
            )
        },

        shouldShowLoader() {
            return !Boolean(this.deleted) && Boolean(this.field.thumbnailUrl)
        },

        shouldShowRemoveButton() {
            return Boolean(this.field.deletable)
        },
    },
}
</script>
