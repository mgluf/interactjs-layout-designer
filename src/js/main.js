// =================================================================================
//  EDIT LAYOUT MODE
//  built using interact.js
//  https://interactjs.io/docs/
//
//  FIXME: restrict resize to canvas
//
// =================================================================================



//get all image dimensions

  let canvasImages = Array.from(
    document.querySelectorAll('.canvasElement > img')
    );
  
  canvasImages.forEach(child => child.onload = function(){ // wait to read image dimensions until they load.
    let imgAspect = child.naturalWidth/child.naturalHeight;
    console.log(child.parentElement.id, "x: "+child.naturalWidth, "y: "+child.naturalHeight, imgAspect)
  }
    
    )




// Edit Layout Button
import editLayout from './editLayout'
document.getElementById("editLayoutButton").addEventListener("click", editLayout);

//interactjs import
const interact = require('interactjs')

// create a restrict modifier to prevent dragging an element out of the canvas
const restrictToCanvas = interact.modifiers.restrict({
  restriction: 'parent',
  elementRect: { left: 0, right: 1, top: 0, bottom: 1 }, //can alter this to create a 'margin' restriction
})

// create a snap modifier which changes the event coordinates to the closest corner of a grid
const snap = interact.modifiers.snap({
  targets: [interact.snappers.grid({ x: 50, y: 50 })], //I have a defined canvas size to ensure grid snapping works fairly consistently
  relativePoints: [{ x: 1, y: 1 }],
})

const aspectRatio = interact.modifiers.aspectRatio({
  ratio: 3/2,
  modifiers: [
    interact.modifiers.restrictSize({ max: 'parent' })
  ]
})

interact('.resizable')
  .draggable({
    origin: 'parent',
    modifiers: [restrictToCanvas, snap],

  //   listeners:{
  //     start (event) {
  //       console.log(
  //         JSON.stringify({
  //           eventType: event.type,
  //           objectID: event.target.id,
  //         }
  //         ));

  //     },

  //     end (event) {
  //       console.log(
  //         JSON.stringify({
  //           eventType: event.type,
  //           objectID: event.target.id,
  //         }
  //         ));
  //     },
  // }

  })
  .resizable({
    modifiers: [snap, aspectRatio],
    
    // listeners:{
    //   start(event){
    //     console.log(
    //       JSON.stringify({
    //         eventType: event.type,
    //         objectID: event.target.id,
    //         size:{
    //           x: event.target.style.width,
    //           y: event.target.style.height
    //         }
    //       }
    //       ));
    //   },

    //   end(event){
    //     console.log(
    //       JSON.stringify({
    //         eventType: event.type,
    //         objectID: event.target.id,
    //         size:{
    //           x: event.target.style.width,
    //           y: event.target.style.height
    //         }
    //       }
    //       ));
    //   }

    // },
    preserveAspectRatio: false,
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

// =================================================================================
// IMAGE CROPPING
// 
// =================================================================================