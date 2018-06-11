import Vue from 'vue'

Vue.component('default-field', require('./components/Form/DefaultField.vue'))
Vue.component('field-wrapper', require('./components/Form/FieldWrapper.vue'))

// Panels...
Vue.component('panel', require('./components/Detail/Panel.vue'))
Vue.component('relationship-panel', require('./components/Detail/RelationshipPanel.vue'))

// Text Field...
Vue.component('index-text-field', require('./components/Index/TextField.vue'))
Vue.component('detail-text-field', require('./components/Detail/TextField.vue'))
Vue.component('form-text-field', require('./components/Form/TextField.vue'))

// Password Field...
Vue.component('index-password-field', require('./components/Index/PasswordField.vue'))
Vue.component('detail-password-field', require('./components/Detail/PasswordField.vue'))
Vue.component('form-password-field', require('./components/Form/PasswordField.vue'))

// Textarea Field...
Vue.component('index-textarea-field', require('./components/Index/TextField.vue'))
Vue.component('detail-textarea-field', require('./components/Detail/TextField.vue'))
Vue.component('form-textarea-field', require('./components/Form/TextareaField.vue'))

// Json Field...
Vue.component('index-json-field', require('./components/Index/TextField.vue'))
Vue.component('detail-json-field', require('./components/Detail/TextField.vue'))
Vue.component('form-json-field', require('./components/Form/JsonField.vue'))

// Has One Field...
Vue.component('detail-has-one-field', require('./components/Detail/HasOneField.vue'))

// Has Many Field...
Vue.component('detail-has-many-field', require('./components/Detail/HasManyField.vue'))

// Belongs To Field...
Vue.component('index-belongs-to-field', require('./components/Index/BelongsToField.vue'))
Vue.component('detail-belongs-to-field', require('./components/Detail/BelongsToField.vue'))
Vue.component('form-belongs-to-field', require('./components/Form/BelongsToField.vue'))

// Belongs To Many Field...
Vue.component('detail-belongs-to-many-field', require('./components/Detail/BelongsToManyField.vue'))

// Morph To Field...
Vue.component('index-morph-to-field', require('./components/Index/MorphToField.vue'))
Vue.component(
    'index-morph-to-action-target-field',
    require('./components/Index/MorphToActionTargetField.vue')
)
Vue.component('detail-morph-to-field', require('./components/Detail/MorphToField.vue'))
Vue.component(
    'detail-morph-to-action-target-field',
    require('./components/Detail/MorphToActionTargetField.vue')
)
Vue.component('form-morph-to-field', require('./components/Form/MorphToField.vue'))

// Morph To Many Field...
Vue.component('detail-morph-to-many-field', require('./components/Detail/MorphToManyField.vue'))

// Date Field
Vue.component('index-date', require('./components/Index/DateField.vue'))
Vue.component('form-date', require('./components/Form/DateField.vue'))
Vue.component('detail-date', require('./components/Detail/DateField.vue'))

// DateTime Field...
Vue.component('index-date-time', require('./components/Index/DateTimeField.vue'))
Vue.component('form-date-time', require('./components/Form/DateTimeField.vue'))
Vue.component('detail-date-time', require('./components/Detail/DateTimeField.vue'))

// Markdown Field
Vue.component('index-markdown-field', require('./components/Detail/TextField.vue'))
Vue.component('detail-markdown-field', require('./components/Detail/MarkdownField.vue'))
Vue.component('form-markdown-field', require('./components/Form/MarkdownField.vue'))

// Trix Field
Vue.component('detail-trix-field', require('./components/Detail/TrixField.vue'))
Vue.component('form-trix-field', require('./components/Form/TrixField.vue'))

// Boolean Field
Vue.component('index-boolean-field', require('./components/Index/BooleanField.vue'))
Vue.component('detail-boolean-field', require('./components/Detail/BooleanField.vue'))
Vue.component('form-boolean-field', require('./components/Form/BooleanField.vue'))

// Upload Field
Vue.component('index-upload-field', require('./components/Index/UploadField.vue'))
Vue.component('detail-upload-field', require('./components/Detail/UploadField.vue'))
Vue.component('form-upload-field', require('./components/Form/UploadField.vue'))
