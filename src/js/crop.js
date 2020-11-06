// =================================================================================
//  IMAGE CROP MODE
//
//  built using interact.js
//  https://interactjs.io/docs/
//
// =================================================================================
const interact = require('interactjs')



const position = { x: 0, y: 0 }

var cropper = interact('.cropper').draggable({
  listeners: {
    start (event) {
      console.log(event.type, event.target)
    },
    move (event) {
      position.x += event.dx
      position.y += event.dy

      event.target.style.transform =
        `translate(${position.x}px, ${position.y}px)`
    },
  }
})