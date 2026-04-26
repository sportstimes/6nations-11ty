const { DateTime } = require('luxon')

function ordinal (n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return "'" + n + (s[(v - 20) % 10] || s[v] || s[0]) + "' "
}

const cache = new Map()

module.exports = (date, format, locale = 'en') => {
  const cacheKey = `${date}-${locale}`
  if (!cache.has(cacheKey)) {
    cache.set(cacheKey, DateTime.fromISO(date).setLocale(locale))
  }

  const dt = cache.get(cacheKey)
  return dt.toFormat(format.replace('dS ', ordinal(dt.day)))
}
