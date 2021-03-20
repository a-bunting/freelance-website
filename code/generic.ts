document.addEventListener("DOMContentLoaded", videoPlays, false);

function videoPlays() {
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

function loadPortfolioPiece(htmlString: string): void {
    // code learning:
    // https://stackoverflow.com/questions/3535055/load-html-file-contents-to-div-without-the-use-of-iframes
    fetch('pages/'+htmlString+'.html')
        .then((data: Response) => data.text())
        .then((html: string) => {
            document.getElementById('info__file').innerHTML = html;
        });
}