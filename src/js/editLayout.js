// enter edit layout mode by adding 'resizeable' class to all elements with class='canvasElement'

export default function editLayout() {

  let editLayoutButton= document.getElementById("editLayoutButton");

  if (editLayoutButton.textContent.includes("Edit Layout")) {
    editLayoutButton.innerHTML = "Done Editing Layout";
  } else{
    editLayoutButton.innerHTML = "Edit Layout";
  }

  let canvasElements = Array.from(document.querySelectorAll('.canvasElement'));
  let resizeHandles = Array.from(document.querySelectorAll('.resize-handle'));

  canvasElements.forEach(child => child.classList.toggle('resizable'));
  resizeHandles.forEach(child => child.classList.toggle('hide'));

  }