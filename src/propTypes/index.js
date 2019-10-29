import _ from 'lodash'

const shownViaNewRelationshipModal = {
  shownViaNewRelationModal: {
    type: Boolean,
    default: false,
  },
}

const formField = {
  resourceName: { type: String },
  field: {
    type: Object,
    required: true,
  },
}

const viaAttributes = {
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
}

const propTypes = {
  shownViaNewRelationshipModal,
  formField,
  viaAttributes,
}

function mapProps(attributes) {
  return _.reduce(
    _.pick(propTypes, attributes),
    (result, value, key) => {
      Object.keys(value).forEach(key => {
        result[key] = value[key]
      })

      return result
    },
    {}
  )
}

export { mapProps }
