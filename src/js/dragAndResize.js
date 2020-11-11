const interact = require('interactjs')

// create a restrict modifier to prevent dragging an element out of the canvas
const restrictToCanvas = interact.modifiers.restrict({
  restriction: 'parent',
  elementRect: { left: 0, right: 1, top: 0, bottom: 1 }, //can alter this to create a 'margin' restriction
})

var drageAndResize =  interact('.resizable')
  .draggable({
    origin: 'parent',
    modifiers: [restrictToCanvas],

    listeners:{
      start (event) {},
      end (event) {},
    }
  })

  .resizable({
    modifiers: [restrictToCanvas],
    listeners:{
      start(event){ },
      end(event){ },

    preserveAspectRatio: false,
    edges: {
      left: true,
      right: true,
      bottom: true,
      top: true
    }
  }

  })

  .on('dragstart', function (event) {
    event.preventDefault();
  })
  .on('dragmove', dragMoveListener )

  .on('resizemove', function(event) {
    var target = event.target,
      x = (parseFloat(target.getAttribute('data-x')) || 0),
      y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
      'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

  })


function dragMoveListener(event) {
  var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
  
}

interact('.resizeable').draggable({
  modifiers: [
    interact.modifiers.snap({
      targets: [ { x: 300, y: 300 } ],
      relativePoints: [
        { x: 0  , y: 0   },   // snap relative to the element's top-left,
        { x: 0.5, y: 0.5 },   // to the center
        { x: 1  , y: 1   }    // and to the bottom-right
      ]
    })
  ]
})