import BehavesAsPanel from './BehavesAsPanel'
import Deletable from './Deletable'
import Filterable from './Filterable'
import FormField from './FormField'
import HandlesValidationErrors from './HandlesValidationErrors'
import HasPanels from './HasPanels'
import InteractsWithQueryString from './InteractsWithQueryString'
import InteractsWithResourceInformation from './InteractsWithResourceInformation'
import Paginatable from './Paginatable'
import PerformsSearches from './PerformsSearches'
import PerPageable from './PerPageable'
import TogglesTrashed from './TogglesTrashed'
import { mixin as ClickAway } from 'vue-clickaway'
import { Errors } from 'form-backend-validation/src/Errors'

export default {
    BehavesAsPanel,
    ClickAway,
    Deletable,
    Errors,
    Filterable,
    FormField,
    HandlesValidationErrors,
    HasPanels,
    InteractsWithQueryString,
    InteractsWithResourceInformation,
    Paginatable,
    PerformsSearches,
    PerPageable,
    TogglesTrashed,
}
