export default {
    beforeRouteLeave(to, from, next) {
        if (this.canLeave) {
            next()
            return;
        }

        const answer = window.confirm(
            this.__('Do you really want to leave? You have unsaved changes.')
        )
        if (answer) {
            next()
            return;
        } 

        next(false)
    },
}
