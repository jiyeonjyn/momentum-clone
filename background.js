const body = document.querySelector("body");
const IMG_NUMBER = 10;

function paintImage(imgNum) {
    const bg = document.createElement("div");
    bg.style.backgroundImage = `url(images/img${imgNum}.jfif)`;
    bg.classList.add("bg-img");
    body.prepend(bg);
}

function genRandom() {
    const number = Math.ceil(Math.random() * IMG_NUMBER);
    if (number === 0) return 1;
    return number;
}

function init() {
    const ranNum = genRandom();
    paintImage(ranNum);
}

init();
