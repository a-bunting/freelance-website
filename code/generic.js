document.addEventListener("DOMContentLoaded", videoPlays, false);
document.addEventListener("DOMContentLoaded", domLoaded, false);
/**
 * Vheck if the user is trying to refresh a page with an info box open
 * If they are, stop it attempting to load (as it wont have context for what to load)
 */
function domLoaded() {
    if (location.hash) {
        location.hash = 'a';
    }
}
/**
 * Play the video when a portfolio piece is hovered over.
 */
function videoPlays() {
    var video = document.getElementsByClassName("portfolio__video");
    for (var i = 0; i < video.length; i++) {
        let vid = video[i];
        vid.addEventListener("mouseover", (e) => {
            vid.play();
        });
        vid.addEventListener("mouseout", (e) => {
            vid.pause();
        });
    }
}
/**
 * Load a portfolio piece to be viewed.
 * @param htmlString
 */
function loadPortfolioPiece(htmlString) {
    // code learning:
    // https://stackoverflow.com/questions/3535055/load-html-file-contents-to-div-without-the-use-of-iframes
    fetch('pages/' + htmlString + '.html')
        .then((data) => data.text())
        .then((html) => {
        document.getElementById('info__file').innerHTML = html;
    });
}
