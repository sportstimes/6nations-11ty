const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [
    require('postcss-import')({
      plugins: [
        require('stylelint')({
          quietDeprecationWarnings: true
        })
      ]
    }),
    require('autoprefixer'),
    ...(isProd ? [require('cssnano')] : [])
  ]
}
