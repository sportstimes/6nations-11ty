/**
 * showDate
 *
 * Checks if the current date is different from the previous date
 *
 * @param {object} collection
 * @param {string} date
 * @param {number} index
 * @returns {boolean}
 */
module.exports = (collection, date, index) => {
  // if it's the first item, show the date
  if (index === 0) {
    return true
  }

  const prevIndex = index - 1
  const prevDay = collection[prevIndex].data.date

  // Handle potential null/undefined values gracefully
  if (!prevDay || !date) {
    return prevDay !== date
  }

  // Optimized: compare date strings directly instead of parsing with Luxon
  return prevDay.substring(0, 10) !== date.substring(0, 10)
}
