const { DateTime } = require('luxon')

const now = DateTime.now()

const isUpcoming = post => {
  if (!post.data._date) {
    post.data._date = DateTime.fromISO(post.data.date)
  }
  return post.data._date >= now
}

const limit = (arr, limit = 1) => arr.slice(0, limit)

const upcoming = arr => arr.filter(isUpcoming)

module.exports = {
  limit,
  upcoming,
  next: arr => arr.find(isUpcoming)
}
