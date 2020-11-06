// =================================================================================
//  EDIT LAYOUT MODE
//
//  built using interact.js
//  https://interactjs.io/docs/
//
//  FIXME: restrict resize to canvas
//  FIXME: snap resize div to img
//
// =================================================================================


//store clicked canvasElement data
var elements = document.getElementsByClassName("canvasElement");
var clickedElement = 0
var clickElement = function(clickedElement) {
    clickedElement = this;
    console.log("clicked "+clickedElement.id);
    return clickedElement;
};

for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', clickElement, false);
}

//store canvas dimensions
let canvas = document.getElementById('canvas');


// enter edit layout mode by adding 'resizeable' class to all elements with class='canvasElement'

export default function editLayout() {

  let editLayoutButton= document.getElementById("editLayoutButton");

  if (editLayoutButton.textContent.includes("Edit Layout")) {
    editLayoutButton.innerHTML = "Done Editing Layout";
  } else{
    editLayoutButton.innerHTML = "Edit Layout";
  }

  let toggleDragResize = Array.from(document.querySelectorAll('.canvasElement'));
  let resizeHandles = Array.from(document.querySelectorAll('.resize-handle'));
  let toggleCrop = Array.from(document.querySelectorAll('.crop-container > img'));


  toggleDragResize.forEach(child => child.classList.toggle('resizable'));
  resizeHandles.forEach(child => child.classList.toggle('hide'));
  toggleCrop.forEach(child => child.classList.toggle('cropper'));

  }

// =================================================================================
// Interact.js
// =================================================================================

//interactjs import
const interact = require('interactjs')

// prevent dragging an element out of the canvas
const restrictToCanvas = interact.modifiers.restrict({
  restriction: 'parent',
  elementRect: { left: 0, right: 1, top: 0, bottom: 1 },
})

// snap event coordinates to the closest corner of a grid
const snap = interact.modifiers.snap({
  targets: [
    interact.snappers.grid(
      { x: canvas.offsetWidth/25, y: canvas.offsetHeight/25 })
    ],
  relativePoints: [{ x: .5, y: .5 }],
})

const minMaxSize = interact.modifiers.restrictSize({
        min: { width: 50, height: 50 },
        max: { width: canvas.offsetWidth-50, height: canvas.offsetHeight-50 },
})

const aspectRatio = interact.modifiers.aspectRatio({
  equalDelta: true,
  modifiers: [
    interact.modifiers.restrictSize({ max: 'parent' })
  ]
})

//main interact function
interact('.resizable')
  .draggable({
    origin: 'parent',
    modifiers: [restrictToCanvas, snap],

    listeners:{
      start (event) {
        console.log(JSON.stringify({eventType: event.type,objectID: event.target.id,}));
      },
      end (event) {
        console.log(JSON.stringify({eventType: event.type,objectID: event.target.id,}));
      },
  }

  })
  .resizable({
    modifiers: [snap, minMaxSize, aspectRatio],
    
    listeners:{
      start(event){
        console.log(JSON.stringify({eventType: event.type, objectID: event.target.id, size:{ x: event.target.style.width, y: event.target.style.height}}));
      },

      end(event){
        console.log(JSON.stringify({eventType: event.type, objectID: event.target.id, size:{ x: event.target.style.width, y: event.target.style.height}}));
      }

    },

    preserveAspectRatio: true,
    edges: {
      left: true,
      right: '.resize-handle',
      bottom: '.resize-handle',
      top: true
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