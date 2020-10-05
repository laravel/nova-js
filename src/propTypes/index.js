import _ from 'lodash'

const propTypes = {
  showHelpText: {
    type: Boolean,
    default: false,
  },

  shownViaNewRelationModal: {
    type: Boolean,
    default: false,
  },

  resourceId: { type: [Number, String] },

  resourceName: { type: String },

  field: {
    type: Object,
    required: true,
  },

  viaResource: {
    type: String,
    required: false,
  },

  viaResourceId: {
    type: [String, Number],
    required: false,
  },

  viaRelationship: {
    type: String,
    required: false,
  },

  shouldOverrideMeta: {
    type: Boolean,
    default: false,
  },
}

function mapProps(attributes) {
  return _.pick(propTypes, attributes)
}

export { mapProps }
