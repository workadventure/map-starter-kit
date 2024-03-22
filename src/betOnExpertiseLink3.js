
const text = [
    "« Il est vrai que la cybersécurité peut sembler être un sujet austère au premier abord, mais il s'agit d'un enjeu crucial pour la protection des données, des systèmes et de la propriété intellectuelle de nos clients. La maîtrise des systèmes d'information est en effet impérative pour répondre à ces enjeux. » - Mouhédine Habache, Practice Leader Cybersécurité "
];
let index = 0;
let textIndex = 0


function showText() {
    let textElement = document.getElementById("text")
    if (textElement) {
        textElement.textContent = text[textIndex].slice(0, index);
    }
    index++;

    if (textIndex === text.length) {
        document.getElementById("buttonsContainer").style.display = "flex"
    }
   
    if (index <= text[textIndex].length) {
        setTimeout(showText, 20);
    } else {
        let nextButton = document.getElementById("next")
        if (nextButton) {
            nextButton.hidden = false;
        }
    }
}

showText();

const button = document.getElementById("next");

button?.addEventListener("click", () => {
    let nextButton = document.getElementById("next")
    if (nextButton) {
        nextButton.hidden = true;
    }
    index = 0;
    textIndex++;

    if (textIndex >= text.length) {
        document.getElementById("box").style.display = "none";
        window.parent.postMessage({ type: 'closeUIWebsite' }, "*");
        return;
    }
    showText();
});