module.exports = (date, index, collection) => {
  const prevIndex = index - 1

  if (!(prevIndex in collection)) {
    return true
  }

  const prevDay = collection[prevIndex].data.date

  return String(prevDay).substring(0, 10) !== String(date).substring(0, 10)
}
