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
    
    console.log(`ere`);
    document.getElementById("submit").addEventListener("click", sendEmail, false);

    for(let i = 0 ; i < linkListeners.length ; i++) {
        linkListeners[i].addEventListener("click", (event) => {
            toggleOverlay(`/images/portfolio/${event.target.dataset.link}`);
        });
    }

    launchWebDeveloperAnimations();
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

function sendEmail() {
    const url = 'https://api.emailjs.com/api/v1.0/email/send';

    const data = {
        service_id: 'service_1tfvcqe',
        template_id: 'template_a9c12xt',
        user_id: 'user_1ystzLQ4lPxmWtXLAH0Op',
        template_params: {
            'name': document.getElementById("name").value, 
            'email': document.getElementById("email").value, 
            'message': document.getElementById("message").value
        }
    };

    // validate the input... and return if it doesnt work!
    if(!validateEmail(data.template_params.email)) { setContactMessage('Please supply a valid email.'); return; }
    if(!data.template_params.name) { setContactMessage('Please supply a name.'); return; }
    if(!data.template_params.email) { setContactMessage('Please supply an email.'); return; }
    if(!data.template_params.message) { setContactMessage('Please supply a message.'); return; }

    // add a loader to the send thing...
    const spinner = document.createElement('div');
    spinner.setAttribute('id', 'spinner');
    spinner.classList.add('spinner');
    document.getElementById("contact").appendChild(spinner);

    setContactMessage('Submitting...');

    // disable the inputs...
    contactInputToggle(false);

    emailjs
    .send(data.service_id, data.template_id, data.template_params, data.user_id)
    .then(response => {
        if(response.status === 200) {
            const successBox = document.createElement('div');
            successBox.classList.add('contact__sent');
            successBox.innerHTML = "<p>Your message has been sent</p>";

            document.getElementById("contact__form").appendChild(successBox);
            document.getElementById("contact").classList.add('fadeout');

            setContactMessage("")
        }
    })
    .catch(error => { 
        const message = "Your message was not sent. Please try again or email me directly at <a href='mailto:alex.bunting@gmail.com'>alex.bunting@gmail.com</a>.";
        setContactMessage(message);
        contactInputToggle(true);
        document.getElementById('contact').removeChild(spinner);
    });
}

function setContactMessage(message) {
    const sentElement = document.getElementById("contact__send");
    
    if(message !== "") {
        sentElement.style.padding = ".5rem 1rem";
    } else {
        sentElement.style.padding = "0";
    }
    sentElement.innerHTML = message;
}

// taken from https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
// thanks'community wiki'
function validateEmail(email) {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

function contactInputToggle(enabled) {
    document.getElementById("name").setAttribute('disabled', !enabled);
    document.getElementById("email").setAttribute('disabled', !enabled);
    document.getElementById("message").setAttribute('disabled', !enabled); 
}

let animationIndex = 0;

function launchWebDeveloperAnimations() {
    const classes = ['basic', 'wordle'];
    const div = document.getElementById('header__title');
    const time = 5;

    // set the delay time;
    div.style.animationDuration = `${time * 0.5}s`;

    // set the first fadeout
    window.setTimeout(() => { 
        div.classList.remove('header__title--fadeIn');
        div.classList.add('header__title--fadeOut');
    }, time * 0.5 * 1000);

    window.setInterval(() => {
        // identify the current and next class
        let nextClass = animationIndex + 1 < classes.length ? animationIndex + 1 : 0;

        // remove the old and add the new.
        div.classList.add('header__title--fadeIn');
        div.classList.remove('header__title--fadeOut');
        div.classList.remove(`header__title--${classes[animationIndex]}`);
        div.classList.add(`header__title--${classes[nextClass]}`);
        

        animationIndex = nextClass;

        // remove the fadein and add a fadeout after half the time has elapsed...
        window.setTimeout(() => { 
            div.classList.remove('header__title--fadeIn');
            div.classList.add('header__title--fadeOut');
        }, time * 0.5 * 1000);
        
    }, time * 1000);

}