document.addEventListener("DOMContentLoaded", videoPlays, false);
document.addEventListener("DOMContentLoaded", domLoaded, false);

document.getElementById("videoPlayPauseButton").addEventListener("click", togglePlayVideo, false);

/**
 * Vheck if the user is trying to refresh a page with an info box open
 * If they are, stop it attempting to load (as it wont have context for what to load)
 */
function domLoaded(): void {
    console.log(`ere`);
    document.getElementById("submit").addEventListener("click", sendEmail, false);
    
    if(location.hash) {
        location.hash = 'a';
    }
   
    fetch('https://api.github.com/users/Bogomip/contributions')
    .then(data => {
        console.log(`1and here`, data)
    })
    .catch(error => {
        console.error(`nooo`, error)
    }); 

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

function sendEmail(): void {
    // const Http: XMLHttpRequest = new XMLHttpRequest();
    // const url: string = 'https://api.emailjs.com/api/v1.0/email/send';

    const data: { name: string, email: string, message: string } = {
        name: (document.getElementById("name") as HTMLInputElement).value, 
        email: (document.getElementById("email") as HTMLInputElement).value, 
        message: (document.getElementById("message") as HTMLInputElement).value
    }

    console.log(data);

    // Http.open("POST", url);
    // Http.send(data);

    // Http.onreadystatechange = (error: any) => {
    //     console.log(Http.responseText);
    // }
}