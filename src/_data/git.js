const { execSync } = require('child_process')

module.exports = () => {
  try {
    const latestCommit = execSync('git log -1 --format="%s by %an at %cd"').toString().trim()
    return {
      short: latestCommit
    }
  } catch (error) {
    return {
      short: 'Latest commit info unavailable'
    }
  }
}
