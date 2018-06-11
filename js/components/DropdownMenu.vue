<template>
    <div class="dropdown-menu absolute z-50">
        <!-- Gray Version -->
        <svg v-if="dark" class="absolute dropdown-arrow z-50" width="46px" height="23px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 44 22"><defs><path id="a" d="M0 0h44v22H0z"/><path id="c" d="M2 22L22 2l20 20z"/></defs><g fill="none" fill-rule="evenodd"><mask id="b" fill="#fff"><use xlink:href="#a"/></mask><g mask="url(#b)"><use fill="#F6F8FB" xlink:href="#c"/><path stroke="#CCD4DB" d="M.793 22.5L22 1.293 43.207 22.5H.793z"/></g></g></svg>

        <!-- White Version -->
        <svg v-else class="absolute dropdown-arrow z-50" width="46px" height="23px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 44 22"><defs><path id="a" d="M0 0h44v22H0z"/><path id="c" d="M2 22L22 2l20 20z"/></defs><g fill="none" fill-rule="evenodd"><mask id="b" fill="#fff"><use xlink:href="#a"/></mask><g mask="url(#b)"><use fill="#FFF" xlink:href="#c"/><path stroke="#CCD4DB" d="M.793 22.5L22 1.293 43.207 22.5H.793z"/></g></g></svg>

        <div :style="styles" class="z-40 overflow-hidden bg-white border border-60 shadow rounded-lg">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        dark: {
            type: Boolean,
            default: false,
        },
        width: {
            default: 120,
        },
    },
    computed: {
        styles() {
            return {
                width: `${this.width}px`,
            }
        },
    },
}
</script>
