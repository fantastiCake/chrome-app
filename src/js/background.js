
const NUMBER_OF_BACKGROUND_IMAGES = 5;

function init() {
    const randomImageNumber = Math.floor(1 + Math.random() * NUMBER_OF_BACKGROUND_IMAGES);
    const body = document.querySelector("body");
    body.style.backgroundImage = `url(src/images/background${randomImageNumber}.jpg)`;
    body.style.backgroundPosition = "center";
    body.style.backgroundSize = "cover";
}

init();