document.addEventListener("DOMContentLoaded", videoPlays, false);
document.addEventListener("DOMContentLoaded", domLoaded, false);

document.getElementById("videoPlayPauseButton").addEventListener("click", togglePlayVideo, false);

/**
 * Vheck if the user is trying to refresh a page with an info box open
 * If they are, stop it attempting to load (as it wont have context for what to load)
 */
function domLoaded(): void {
    if(location.hash) {
        location.hash = 'a';
    }
}

/**
 * Play the video when a portfolio piece is hovered over.
 */
function videoPlays(): void {
    var video: HTMLCollectionOf<Element> = document.getElementsByClassName("portfolio__video");

    
    for(var i = 0; i < video.length ; i++) {
        let vid: HTMLVideoElement = video[i] as HTMLVideoElement;
        
        vid.addEventListener("mouseover", (e :MouseEvent) => {
            vid.play();
        });

        vid.addEventListener("mouseout", (e :MouseEvent) => {
            vid.pause();
        });
    }
}

/**
 * Load a portfolio piece to be viewed.
 * @param htmlString 
 */
function loadPortfolioPiece(htmlString: string): void {
    // code learning:
    // https://stackoverflow.com/questions/3535055/load-html-file-contents-to-div-without-the-use-of-iframes
    fetch('pages/'+htmlString+'.html')
        .then((data: Response) => data.text())
        .then((html: string) => {
            document.getElementById('info__file').innerHTML = html;
        });
}

let playVideo: boolean = false;

function togglePlayVideo(): void {
    playVideo = !playVideo;

    console.log(playVideo);

    // video is playing now
    if(playVideo) {
        document.getElementById("togglePlayVideo").classList.add("video-popup__playpause--corner");
    } else {
        document.getElementById("togglePlayVideo").classList.remove("video-popup__playpause--corner");
    }
}