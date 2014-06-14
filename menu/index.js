var exercises = require('../exercises.json')
var menu = require('browser-menu')({
    x: 2, y: 2
  , bg: process.browser ? '#1F8DD6' : 'blue'
  , fg: process.browser ? '#f2f2f2' : 'white'
})

menu.reset()
menu.write('GLSLIFY WORKSHOP\n')
menu.write('------------------------------------------------------\n')
Object.keys(exercises).forEach(function(name) {
  menu.add(name)
})
menu.write('------------------------------------------------------\n')
menu.add('» EXIT')

menu.on('select', function(label) {
  // TODO: use the exit command?
  if (!exercises[label]) return console.error(label)

  window.location = exercises[label]
})
