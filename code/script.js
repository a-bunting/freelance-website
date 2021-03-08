// npm install -g typescript
// make tsconfig.json
// use ctrl + space (intellisense!) to create the stuff for that file
// in this file use ctrl + shift + b to build, and click watch to auto compile.
// learned at https://www.kirupa.com/html5/running_your_code_at_the_right_time.htm
// wait until the page has loaded to launch the scanning for active bits.
// this is fort he scrolling effects.
document.addEventListener("DOMContentLoaded", loadedReadyToScroll, false);
var elementsToShow;
var scroller;
function loadedReadyToScroll() {
    // loop the function in the animation frame.
    scroller = window.requestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
    // select .scrollable classes
    elementsToShow = document.querySelectorAll('.scrollable');
    // ignite the scrolling animations loop
    scrollingLoop();
}
function scrollingLoop() {
    elementsToShow.forEach(function (element) {
        if (isElementInViewport(element)) {
            element.classList.add('is-visible');
        }
        else {
            element.classList.remove('is-visible');
        }
    });
    scroller(scrollingLoop);
}
// from https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */);
}
