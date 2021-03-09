// npm install -g typescript
// make tsconfig.json
// use ctrl + space (intellisense!) to create the stuff for that file
// in this file use ctrl + shift + b to build, and click watch to auto compile.



// learned at https://www.kirupa.com/html5/running_your_code_at_the_right_time.htm
// wait until the page has loaded to launch the scanning for active bits.
// this is for the scrolling effects.
document.addEventListener("DOMContentLoaded", loadedReadyToScroll, false);

var elementsToShow: NodeList;
var scroller: any;   // for lack of a better type for typescript 

function loadedReadyToScroll(): void {
   // loop the function in the animation frame.
   scroller = window.requestAnimationFrame || function(callback) {
      window.setTimeout(callback, 1000/60);
   }

   // select .scrollable classes
   elementsToShow = document.querySelectorAll('.scrollable');

   // ignite the scrolling animations loop
   scrollingLoop();
}

/**
 * Loop through all elements to test if visible, and if so apply the is-visible class to them.
 */

function scrollingLoop(): void {
   elementsToShow.forEach((element: HTMLInputElement) => {
      if(isElementInViewport(element)) {
         element.classList.add('is-visible');
      } else {
         element.classList.remove('is-visible');
      }
   });

   scroller(scrollingLoop);
}

/**
 * This function takes the element and dterm,ines if its currently in view.
 * Basic code from https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
 * 
 * @param el: Element
 * @returns void
 */

function isElementInViewport (el: Element): boolean {

   var rect: DOMRect = el.getBoundingClientRect();

   // for smoother transitions determine a difference between if you are scrolling up or down.
   if(scrollingUp) {
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
      );
   } else {
      return (
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
          rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
      );
   }
}

/**
 * This gets the scroll direction and sets scrollingUp to true if its scrolling upwards.
 * This helps make transitions smoother
 */
var previousScrollYPos: number = 0;
var scrollingUp: boolean = false;

document.addEventListener("scroll", function(): void {
   var position: number = window.pageYOffset || document.documentElement.scrollTop;

   if(position < previousScrollYPos) {
      // scrolling up...
      scrollingUp = true;
   } else {
      scrollingUp = false;
   }

   previousScrollYPos = position <= 0 ? 0 : position; // apparantly negative scrolling is a thing?
});
