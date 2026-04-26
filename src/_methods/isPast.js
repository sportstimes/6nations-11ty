const { DateTime } = require('luxon')

const now = DateTime.now()

module.exports = post => {
  const dateStr = post.data.endDate || post.data.date
  const cacheKey = post.data.endDate ? '_endDate' : '_date'

  if (!post.data[cacheKey]) {
    post.data[cacheKey] = DateTime.fromISO(dateStr)
  }

  return post.data[cacheKey] <= now
}
