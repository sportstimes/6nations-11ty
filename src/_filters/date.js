const { DateTime } = require('luxon')

function ordinal (n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return "'" + n + (s[(v - 20) % 10] || s[v] || s[0]) + "' "
}

const cache = new Map()

module.exports = (date, format, locale = 'en') => {
  const cacheKey = `${date}-${format}-${locale}`
  let result = cache.get(cacheKey)

  if (result === undefined) {
    const dt = DateTime.fromISO(date).setLocale(locale)
    result = dt.toFormat(format.replace('dS ', ordinal(dt.day)))
    cache.set(cacheKey, result)
  }

  return result
}
