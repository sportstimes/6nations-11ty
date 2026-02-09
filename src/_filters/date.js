const { DateTime } = require('luxon')

const cache = new Map()

function ordinal (n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return "'" + n + (s[(v - 20) % 10] || s[v] || s[0]) + "' "
}

module.exports = (date, format, locale = 'en') => {
  let dt
  if (DateTime.isDateTime(date)) {
    dt = date
  } else if (date instanceof Date) {
    dt = DateTime.fromJSDate(date)
  } else if (typeof date === 'string') {
    const cacheKey = `${date}_${locale}`
    if (cache.has(cacheKey)) {
      dt = cache.get(cacheKey)
    } else {
      dt = DateTime.fromISO(date).setLocale(locale)
      if (dt.isValid) {
        cache.set(cacheKey, dt)
      }
    }
  } else {
    dt = DateTime.fromISO(date)
  }

  if (dt.locale !== locale) {
    dt = dt.setLocale(locale)
  }

  return dt.toFormat(format.replace('dS ', ordinal(dt.day)))
}
