import { Inflector } from '../'

export default function singularOrPlural(value, suffix) {
    if (value.match(/^(.*)[A-Za-zÀ-ÖØ-öø-ÿ]$/) == null) return value
    else if (value > 1 || value == 0) return Inflector.pluralize(suffix)
    return Inflector.singularize(suffix)
}
