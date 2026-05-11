const getISODate = (d) => {
  if (typeof d === 'string') {
    return d.substring(0, 10)
  }
  if (d instanceof Date) {
    return d.toISOString().substring(0, 10)
  }
  return ''
}

module.exports = (date, index, collection) => {
  const prevIndex = index - 1

  if (!(prevIndex in collection)) {
    return true
  }

  const prevDay = collection[prevIndex].data.date

  return getISODate(prevDay) !== getISODate(date)
}
