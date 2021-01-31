
const USERNAME_LS_KEY = "username"

const greetingButton = document.querySelector(".greeting-area__button");
const greetingText = document.querySelector(".greeting-area__text");

function handleGreetingButton(event) {
    const username = greetingText.value;
    if(username) {
        localStorage.setItem(USERNAME_LS_KEY, username);

        const greetingUsername = document.querySelector(".greeting-area__username");
        greetingUsername.innerText = localStorage.getItem(USERNAME_LS_KEY);
        greetingText.hidden = true;
        greetingButton.hidden = true;
    }
}

function init() {
    if(localStorage.getItem(USERNAME_LS_KEY)) {
        const greetingUsername = document.querySelector(".greeting-area__username");
        greetingUsername.innerText = localStorage.getItem(USERNAME_LS_KEY);
    }
    else {
        greetingButton.hidden = false;
        greetingText.hidden = false;
        greetingButton.addEventListener("click", handleGreetingButton, false);
        greetingText.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
              event.preventDefault();
              handleGreetingButton(event);
            }
          })
    }
}

init();