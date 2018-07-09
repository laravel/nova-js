export default {
  methods: {
    /**
     * Convert the given localized date time string to UTC.
     */
    toAppTimezone(value) {
      return value
                  ? moment.tz(value, moment.tz.guess()).clone().tz('UTC').format('YYYY-MM-DD kk:mm:ss')
                  : value
    },

    /**
     * Convert the given UTC date time string to the local timezone.
     */
    fromAppTimezone(value) {
        if (! value) {
            return '';
        }

        return moment.tz(value, 'UTC')
                    .clone()
                    .tz(moment.tz.guess())
                    .format('YYYY-MM-DD kk:mm:ss')
    },

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
