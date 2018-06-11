<template>
    <div v-on-clickaway="hide" :class="customClasses" class="dropdown relative">
        <dropdown-trigger :handle-click="toggle">
            <slot name="default"></slot>
        </dropdown-trigger>

        <transition name="fade">
            <dropdown-menu v-show="visible" :width="width" :dark="dark">
                <slot name="menu"></slot>
            </dropdown-menu>
        </transition>
    </div>
</template>

<script>
    import { mixin as clickaway } from 'vue-clickaway'

    export default {
        mixins: [clickaway],
        props: {
            'direction': {
                'default': 'ltr'
            },
            'width': {
                default: 120,
            },
            'dark': {
                type: Boolean,
                default: false,
            },
            'activeClass': {
                default: 'dropdown-trigger-active'
            }
        },
        data() {
            return {
                visible: false,
            }
        },
        methods: {
            toggle() {
                this.visible = !this.visible
            },
            hide() {
                this.visible = false
            }
        },
        computed: {
            customClasses() {
                return [
                    this.isActive ? this.activeClass : '',
                    this.direction == 'ltr' ? 'dropdown-menu-left' : 'dropdown-menu-right',
                ]
            },

            isActive() {
                return this.visible == true
            }
        }
    }
</script>
