const { DateTime } = require('luxon')

const limit = (arr, limit = 1) => arr.slice(0, limit)

const getIsFuture = (date, now) => {
  return DateTime.fromISO(date) >= now
}

const upcoming = arr => {
  const now = DateTime.now()
  return arr.filter(post => getIsFuture(post.data.date, now))
}

module.exports = {
  limit,
  upcoming,
  next: arr => {
    const now = DateTime.now()
    return arr.find(post => getIsFuture(post.data.date, now))
  }
}
