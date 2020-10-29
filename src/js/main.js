const interact = require('interactjs')


// dragable
const position = { x: 0, y: 0 }


interact('.draggable')
  .draggable({
    listeners: {
      start (event) {
        console.log(event.type, position)
        
      },
      move (event) {
        position.x += event.dx
        position.y += event.dy

        event.target.style.transform =
          `translate(${position.x}px, ${position.y}px)`
      },

      end () {
        console.log(event.type, position);
      },

    }
})

interact('.resizable')
.resizable({
  edges: {
    top: true,
    right: true,
    bottom: true,
    left: true,
  },
})
.on('resizemove', event => {
  let { x, y } = event.target.dataset

  x = parseFloat(x) || 0
  y = parseFloat(y) || 0

  Object.assign(event.target.style, {
    width: `${event.rect.width}px`,
    height: `${event.rect.height}px`,
    transform: `translate(${event.deltaRect.left}px, ${event.deltaRect.top}px)`
  })

  Object.assign(event.target.dataset, { x, y })
})
