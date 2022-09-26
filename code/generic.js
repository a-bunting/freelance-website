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

    let linkListeners = document.getElementsByClassName("playVideoLink")
    
    for(let i = 0 ; i < linkListeners.length ; i++) {
        linkListeners[i].addEventListener("click", (event) => {
            toggleOverlay(`/images/portfolio/${event.target.dataset.link}`);
        });
    }
    
}
/**
 * Play the video when a portfolio piece is hovered over.
 */
function videoPlays() {
    var video = document.getElementsByClassName("portfolio__video");
    for (var i = 0; i < video.length; i++) {
        let vid = video[i];
        let parent = document.getElementById('portfolio'+i);
        parent.addEventListener("mouseover", (e) => {
            vid.play();
        });
        parent.addEventListener("mouseout", (e) => {
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

let playVideo = false;

function toggleOverlay(link) {
    // get the display elements
    let overlay = document.getElementById("video-popup");
    let video = document.getElementById('fullScreenVideo');
    let button = document.getElementById("videoPlayPauseButton")

    if(link) {
        // open the overlay
        overlay.classList.add('video-popup__display');
        overlay.classList.remove('video-popup__hide');
        
        // overlay opens so add the play pause listener
        button.addEventListener("click", togglePlayVideo, false);

        // and add something to remove it too if the background is clicked...
        overlay.addEventListener("click", (event) => { removeOverlay(event); }, false);
        
        video.setAttribute('src', link);
    }
}

function removeOverlay(event) {

    if(event.target.id === 'video-popup') {
        let overlay = document.getElementById("video-popup");
        let button = document.getElementById("videoPlayPauseButton")
        let video = document.getElementById('fullScreenVideo');

        // remove the click evebnt listener
        button.removeEventListener("click", togglePlayVideo, false);
        overlay.removeEventListener("click", toggleOverlay(null), false);

        // remove the overlay
        overlay.classList.remove('video-popup__display');
        overlay.classList.add('video-popup__hide');

        video.removeAttribute('src');

        togglePlayVideo(false);
    }
}

function togglePlayVideo(onOff) {
    playVideo = onOff && !playVideo;

    // get the display elements
    let overlay = document.getElementById("video-popup");
    let button = document.getElementById("videoPlayPauseButton");

    // get the video...
    let video = document.getElementById('fullScreenVideo');

    // video is playing now
    if(playVideo) {
        button.classList.remove("video-popup__playpause--play");
        button.classList.add("video-popup__playpause--pause");
        video.play();
    } else {
        button.classList.add("video-popup__playpause--play");
        button.classList.remove("video-popup__playpause--pause");
        video.pause();
    }
}