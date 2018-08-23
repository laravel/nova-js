export default {
  methods: {
    /**
     * Convert the given localized date time string to the application's timezone.
     */
    toAppTimezone(value) {
      return value
        ? moment
            .tz(value, this.userTimezone)
            .clone()
            .tz(Nova.config.timezone)
            .format('YYYY-MM-DD HH:mm:ss')
        : value
    },

    /**
     * Convert the given application timezone date time string to the local timezone.
     */
    fromAppTimezone(value) {
      if (!value) {
        return value
      }

      return moment
        .tz(value, Nova.config.timezone)
        .clone()
        .tz(this.userTimezone)
        .format('YYYY-MM-DD HH:mm:ss')
    },

    /**
     * Get the localized date time for the given field.
     */
    localizeDateTimeField(field) {
      if (!field.value) {
        return field.value
      }

      const localized = moment
        .tz(field.value, Nova.config.timezone)
        .clone()
        .tz(this.userTimezone)

      if (field.format) {
        return localized.format(field.format)
      }

      return this.usesTwelveHourTime
        ? localized.format('YYYY-MM-DD h:mm:ss A')
        : localized.format('YYYY-MM-DD HH:mm:ss')
    },

    /**
     * Get the localized date for the given field.
     */
    localizeDateField(field) {
      if (!field.value) {
        return field.value
      }

      const localized = moment
        .tz(field.value, Nova.config.timezone)
        .clone()
        .tz(this.userTimezone)

      if (field.format) {
        return localized.format(field.format)
      }

      return localized.format('YYYY-MM-DD')
    },
  },

  computed: {
    /**
     * Get the user's local timezone.
     */
    userTimezone() {
      return Nova.config.userTimezone ? Nova.config.userTimezone : moment.tz.guess()
    },

    /**
     * Determine if the user is used to 12 hour time.
     */
    usesTwelveHourTime() {
      return (
        _.endsWith(new Date().toLocaleString(), 'AM') ||
        _.endsWith(new Date().toLocaleString(), 'PM')
      )
    },
  },
}
