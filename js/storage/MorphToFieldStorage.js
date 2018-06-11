import axios from 'axios'

export default {
    fetchAvailableResources(resourceName, fieldAttribute, params) {
        if (resourceName === undefined || fieldAttribute == undefined || params == undefined) {
            throw new Error('please pass the right things')
        }

        return axios.get(`/nova-api/${resourceName}/morphable/${fieldAttribute}`, params)
    },

    determineIfSoftDeletes(resourceType) {
        return axios.get(`/nova-api/${resourceType}/soft-deletes`)
    },
}
