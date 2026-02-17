const { DateTime } = require('luxon')

const limit = (arr, limit = 1) => arr.slice(0, limit)

const getIsFuture = () => {
  const now = DateTime.now()
  return post => DateTime.fromISO(post.data.date) >= now
}

const upcoming = arr => arr.filter(getIsFuture())

module.exports = {
  limit,
  upcoming,
  next: arr => arr.find(getIsFuture())
}
