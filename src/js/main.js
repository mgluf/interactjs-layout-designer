//init dragAndResize
import dragAndResize from './dragAndResize.js'
dragAndResize

//consider scrollbar for 100vw and 100vh for #canvas / .nav
var windowHeight;
(windowHeight = function considerScrollbar () {
  const scrollbarWidth = window.innerWidth - document.body.clientWidth

  let vwElements = Array.from(document.getElementsByClassName('100vw'))
  let  vhElements = Array.from(document.getElementsByClassName('100vh'))

  vwElements.forEach(child => {
    console.log('hello')
    child.style.width = `calc(100vw - ${scrollbarWidth}px)`
  });

  vhElements.forEach(child => {
    child.style.height = `calc(100vh - ${scrollbarWidth}px)`
  });

})();

//==================================
//
// Box Selector
//
//==================================

