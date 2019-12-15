const nameForm = document.querySelector(".js-nameForm"),
    nameInput = nameForm.querySelector("input"),
    greeting = document.querySelector(".greeting");


function greet(name) {
    nameForm.classList.remove("showing");
    greeting.classList.add("showing");
    const hours = parseInt(clock.innerText);
    if ( hours >= 4 && hours < 12 ) {
        greeting.innerText = `Good morning, ${name}.`;
    } else if ( hours >= 12 && hours < 20 ) {
        greeting.innerText = `Good afternoon, ${name}.`;
    } else {
        greeting.innerText = `Good evening, ${name}.`;
    }
}

function askForName() {
    greeting.classList.remove("showing");
    nameForm.classList.add("showing");
    nameForm.addEventListener("submit",(e) => {
        e.preventDefault();
        localStorage.setItem("name", nameInput.value);
        greet(nameInput.value);
    })
}

function loadName() {
    const currentName = localStorage.getItem("name");
    if (currentName) {
        greet(currentName);
    } else {
        askForName();
    }
}

function init() {
    loadName();
}

init();

