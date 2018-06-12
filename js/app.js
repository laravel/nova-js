/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import Vue from 'vue'
import axios from 'axios'
import PortalVue from 'portal-vue'
import AsyncComputed from 'vue-async-computed'
import './plugins/axios'

Vue.use(PortalVue)
Vue.use(AsyncComputed)

/**
 * Next, we'll setup some of Nova's Vue components that need to be global
 * so that they are always available. Then, we will be ready to create
 * the actual Vue instance and start up this JavaScript application.
 */
import './fields'
import './components'

/**
 * Finally, we'll create this Vue Router instance and register all of the
 * Nova routes. Once that is complete, we will create the Vue instance
 * and hand this router to the Vue instance. Then Nova is all ready!
 */
import router from './router'
import Loading from './components/Loading'

const Nova = class Nova {
    constructor(config) {
        this.router = router
        this.bootingCallbacks = []
        this.config = config
    }

    /**
     * Register a callback to be called before Nova starts. This is used to bootstrap
     * addons, tools, custom fields, or anything else Nova needs
     */
    booting(callback) {
        this.bootingCallbacks.push(callback);
    }

    /**
     * Start the Nova app by calling each of the tool's callbacks and then creating
     * the underlying Vue instance.
     */
    liftOff() {
        this.bootingCallbacks.forEach(callback => callback(Vue, this.router))

        this.app = new Vue({
            el: '#nova',
            router: this.router,
            components: { Loading },
            mounted() {
                this.$loading = this.$refs.loading
            },
        })
    }
}

;(function() {
  this.Nova = function(config) {
    return new Nova(config)
  }
}.call(window))
