document.addEventListener("DOMContentLoaded", videoPlays, false);
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
function loadPortfolioPiece(htmlString) {
    // code learning:
    // https://stackoverflow.com/questions/3535055/load-html-file-contents-to-div-without-the-use-of-iframes
    fetch('pages/' + htmlString + '.html')
        .then((data) => data.text())
        .then((html) => {
        document.getElementById('info__file').innerHTML = html;
    });
}
