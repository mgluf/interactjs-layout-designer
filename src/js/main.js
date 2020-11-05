//get all image dimensions
  let canvasImages = Array.from(
    document.querySelectorAll('.canvasElement > img')
    );
  
  canvasImages.forEach(child => child.onload = function(){ // wait to read image dimensions until they load.
    console.log(child.parentElement.id, "x: "+child.naturalWidth, "y: "+child.naturalHeight)
  }
)

// Edit Layout Button
import editLayout from './editLayout'
document.getElementById("editLayoutButton").addEventListener("click", editLayout);