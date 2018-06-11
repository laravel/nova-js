<template>
    <div class="checkbox select-none rounded">
        <svg class="block" v-if="checked" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g id="Page-1" fill="none" fill-rule="evenodd"><g id="checkbox-on" fill-rule="nonzero"><g id="b-link" fill="#4099DE"><rect id="b" width="20" height="20" rx="4"/></g><path id="Shape" fill="#FFF" d="M7.7 9.3c-.23477048-.3130273-.63054226-.46037132-1.01285927-.37708287-.38231702.08328846-.68093514.38190658-.7642236.7642236C5.83962868 10.0694577 5.9869727 10.4652295 6.3 10.7l2 2c.38884351.3811429 1.01115649.3811429 1.4 0l4-4c.3130273-.23477048.4603713-.63054226.3770829-1.01285927-.0832885-.38231702-.3819066-.68093514-.7642236-.7642236C12.9305423 6.83962868 12.5347705 6.9869727 12.3 7.3L9 10.58l-1.3-1.3v.02z"/></g></g></svg>
        <svg class="block" v-else width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g id="Page-1" fill="none" fill-rule="evenodd"><g id="checkbox-off"><g id="b-link" fill="#FFF" fill-rule="nonzero"><rect id="b" width="20" height="20" rx="4"/></g><rect id="Rectangle-path" width="19" height="19" x=".5" y=".5" stroke="#CCD4DB" rx="4"/></g></g></svg>
    </div>
</template>

<script>
export default {
    props: {
        checked: {
            default: false,
        },
    },
}
</script>
