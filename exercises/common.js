var description = require('../lib/description')
var progress    = require('../lib/progress')

var highlight   = require('highlight.js').highlight
var sidebar     = require('gl-compare-sidebar')
var fonts       = require('google-fonts')
var slice       = require('sliced')
var marked      = require('marked')
var xhr         = require('xhr')
var fs          = require('fs')

module.exports = function(opts) {
  opts = opts || {}

  fonts.add({
    'Source Code Pro': [200, 600]
  })

  if (opts.compare) {
    var compare = sidebar(opts.compare)

    if (opts.description) {
      compare.content.innerHTML = marked(opts.description, {
        highlight: function(code, lang) {
          if (!lang) return code
          return highlight(lang, code).value
        }
      })
      openHook(compare.content)
    }
  }

  compare.on('test', function() {
    if (!opts.test) {
      return console.warn('No test function specified for this lesson yet...')
    }

    opts.test(function(err, result) {
      if (err) throw err

      if (result) {
        progress.set(opts.dirname, true)
        compare.status = 'passed!'
        compare.statusColor = '#57FF8A'
      } else {
        compare.status = 'try again?'
        compare.statusColor = '#FF6E57'
      }
    })
  })
}

// For opening directory links cleanly without requiring a temporary
// window: override the click event to send an XHR request to the page
// instead. Will still be fine if opened through other means, but slightly
// cleaner.
function openHook(content) {
  var links = slice(content.querySelectorAll('a[href^="/open/"]'))

  links.forEach(function(link) {
    return link.addEventListener('click', function(e) {
      var href = link.getAttribute('href')
      xhr(href, function(err) {
        if (err) throw err
      })

      e.preventDefault()
      e.stopPropagation()
      return false
    }, false)
  })
}
