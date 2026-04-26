const { DateTime } = require('luxon')

const now = DateTime.now()

const limit = (arr, limit = 1) => arr.slice(0, limit)

const upcoming = arr => {
  return arr.filter(post => {
    if (!post.data._date) {
      post.data._date = DateTime.fromISO(post.data.date)
    }
    return post.data._date >= now
  })
}

module.exports = {
  limit,
  upcoming,
  next: arr => limit(upcoming(arr), 1).pop()
}
