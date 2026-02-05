const { DateTime } = require('luxon')

module.exports = (date, index, collection) => {
  const prevIndex = index - 1

  if (!(prevIndex in collection)) {
    return true
  }

  const prevDay = collection[prevIndex].data.date

  return DateTime.fromISO(prevDay).toISODate() !== DateTime.fromISO(date).toISODate()
}
