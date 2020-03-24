import _ from 'lodash'

const propTypes = {
  shownViaNewRelationModal: {
    type: Boolean,
    default: false,
  },

  resourceId: { type: [Number, String] },

  resourceName: { type: String, required: true },

  field: {
    type: Object,
    required: true,
  },

  viaResource: {
    type: String,
    required: true,
    default: '',
  },

  viaResourceId: {
    type: [String, Number],
    required: true,
    default: '',
  },

  viaRelationship: {
    type: String,
    required: true,
    default: '',
  },
}

function mapProps(attributes) {
  return _.pick(propTypes, attributes)
}

export { mapProps }
