const interact = require('interactjs')


interact('.resizable')
  .draggable({

    listeners:{
      start (event) {
        console.log(event.type,"on","[",event.target.id,"]","x:",event.target.getAttribute("data-x"),"y:",event.target.getAttribute("data-y"));
        
      },

      end (event) {
        console.log(event.type,"on","[",event.target.id,"]","x:",event.target.getAttribute("data-x"),"y:",event.target.getAttribute("data-y"));
      },
  }

  })
  .resizable({
    listeners:{
      start(event){
        console.info(event.type,"on","[",event.target.id,"]");
      },

      end(event){
        console.info(event.type,"on","[",event.target.id,"]");
      }

    },
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
