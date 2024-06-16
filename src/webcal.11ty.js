const ics = require('ics')
const dateTime = require('moment')
const absoluteUrl = require('./_filters/absoluteUrl')

module.exports = class FeedTemplate {
  data() {
    return {
      layout: null,
      pagination: {
        data: 'collections',
        size: 1,
        alias: 'games',
        filter: ['all'],
      },
      permalink: function (data) {
        return `/${this.slugify(data.games)}.ics`
      },
    }
  }

  render({ config, collections, games }) {
    const events = collections[games].map(function (game) {
      const event = {
        start: FeedTemplate.date(game.data.date),
        title: game.data.title,
        description: FeedTemplate.description(game),
        location: game.data.locationName,
        url: absoluteUrl(game.page.url, config.baseUrl),
        status: 'CONFIRMED',
        categories: game.data.tags
      }

      if (game.data.endDate) {
        event.end = FeedTemplate.date(game.data.endDate)
      } else {
        event.duration = { hours: 1, minutes: 45 }
      }

      return event
    })

    return ics.createEvents(events).value
  }

  static date(date) {
    return dateTime(date).format('YYYY-M-D-H-m').split('-').map(a => parseInt(a, 10))
  }

  static description(game) {
    let description = game.content.replace(/(<([^>]+)>)/gi, '').replace(/\n$/, '')

    if (game.data.tv !== undefined) {
      description = `TV Channels: ${game.data.tv.join(', ')}\r\n\r\n${description}`
    }

    return description
  }
}
