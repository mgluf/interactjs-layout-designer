// Edit Layout Button
import editLayout from './editLayout'
document.getElementById("editLayoutButton").addEventListener("click", editLayout);


//init cropper
let cropContainers = Array.from(document.querySelectorAll('.crop-container > img'));  
cropContainers.forEach(child => 
    child.classList.add('cropper'),
    console.log("crop init"),
    console.log(cropContainers)
    );

import cropper from './crop'
cropper

