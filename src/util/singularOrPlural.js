import { Inflector } from '../'
import isString from 'lodash/isString'

export default function singularOrPlural(value, suffix) {
    if (isString(suffix) && suffix.match(/^(.*)[A-Za-zÀ-ÖØ-öø-ÿ]$/) == null) return suffix
    else if (value > 1 || value == 0) return Inflector.pluralize(suffix)
    return Inflector.singularize(suffix)
}
