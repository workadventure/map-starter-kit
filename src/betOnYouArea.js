
const text = [
    "Salut ! Te voilà dans la salle “Bet on You”. Ici tu trouveras nos ressources et publications, telles que des articles et des livres blancs. Qu’aimerais-tu faire ?"
];
let index = 0;
let textIndex = 0

function showText() {
    let textElement = document.getElementById("text")
    if (textElement) {
        textElement.textContent = text[textIndex].slice(0, index);
    }
    index++;
    if (textIndex == 1) {
        document.getElementById("videoContainer").style.display = "flex"
    }
    if (textIndex != 1) {
        document.getElementById("videoContainer").style.display = "none"
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

const button = document.querySelector("button");

button?.addEventListener("click", () => {
    let nextButton = document.getElementById("next")
    if (nextButton) {
        nextButton.hidden = true;
    }
    index = 0;
    textIndex++;
    if (textIndex == text.length) {
        document.getElementById("box").style.display = "none"
    }
    showText();
});