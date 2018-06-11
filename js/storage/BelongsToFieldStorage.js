import axios from 'axios'

export default {
    fetchAvailableResources(resourceName, fieldAttribute, params) {
        return axios.get(`/nova-api/${resourceName}/associatable/${fieldAttribute}`, params)
    },

    determineIfSoftDeletes(resourceName) {
        return axios.get(`/nova-api/${resourceName}/soft-deletes`)
    },
}
