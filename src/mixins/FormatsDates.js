export default {
  methods: {
    /**
     * Get the localized date time for the given field.
     */
    localizeDateTimeField(field) {
        if (! field.value) {
            return ''
        }

        const localized = moment.tz(field.value, Nova.timezone)
                        .clone()
                        .tz(moment.tz.guess())

        if (field.format) {
            return localized.format(field.format)
        }

        return this.twelveHourTime
                    ? localized.format('YYYY-MM-DD h:mm:ss A')
                    : localized.format('YYYY-MM-DD kk:mm:ss')
    },

    /**
     * Get the localized date for the given field.
     */
    localizeDateField(field) {
        if (! field.value) {
            return ''
        }

        const localized = moment.tz(field.value, Nova.timezone)
                        .clone()
                        .tz(moment.tz.guess())

        if (field.format) {
            return localized.format(field.format)
        }

        return localized.format('YYYY-MM-DD')
    }
  },

  computed: {
    /**
     * Determine if the user is used to 12 hour time.
     */
    twelveHourTime() {
        return _.endsWith(new Date().toLocaleString(), 'AM') ||
               _.endsWith(new Date().toLocaleString(), 'PM')
    }
  }
}
