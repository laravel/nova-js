import Pikaday from 'pikaday'
import 'pikaday/css/pikaday.css'
import moment from 'moment'

export default {
    name: 'Calendar',

    props: {
        value: String,
        handleChange: Function,
    },

    data: () => ({
        pikaday: null,
    }),

    watch: {
        value() {
            this.pikaday.setDate(this.value)
        },
    },

    mounted() {
        this.$refs.field.value = moment()
        this.pikaday = new Pikaday({
            // format: 'MMMM D YYYY',
            format: 'dddd, MMMM Do YYYY',
            field: this.$refs.field,
        })

        if (this.value) {
            this.pikaday.setDate(this.value)
        }
    },

    render(h) {
        return (
            <input
                onChange={this.handleChange}
                ref="field"
                type="text"
                class="form-control form-control-sm"
            />
        )
    },
}
