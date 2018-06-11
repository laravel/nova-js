import axios from 'axios'
import router from '../router'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */
axios.interceptors.response.use(
    response => response,
    error => {
        const { status } = error.response

        if (status >= 500) {
            alert('500 Error')
        }

        // Should log the user out
        if (status === 401) {
            window.location.href = '/nova/logout'
        }

        if (status === 404) {
            // alert('404 Error')
            // Router.push({ path: '/404' })
        }

        if (status === 403) {
            // Should log the user out
            alert('403 Error')
        }

        return Promise.reject(error)
    }
)

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */
let token = document.head.querySelector('meta[name="csrf-token"]')

if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token')
}

/**
 * Set Axios as a global so you don't have to import it
 */
window.axios = axios
