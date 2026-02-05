const { DateTime } = require('luxon')

const now = DateTime.now()

module.exports = post => DateTime.fromISO(post.data.endDate || post.data.date) <= now
