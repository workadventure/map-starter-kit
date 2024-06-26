
const text = [
    "Bonjour, et bienvenue sur la map interactive de notre agence Neosoft Niort !",
    "Aujourd'hui, nous te donnons la possibilité d'en apprendre plus sur nos valeurs, nos engagements et notre philosophie au travers de cette carte.",
    "Oh, j'allais oublier !",
    "Avant de partir pour ce voyage, je vais t'indiquer comment accéder au tutoriel qui t'expliquera tout ce que tu peux faire ici avant de découvrir notre agence.",
    "Pour sortir d'un dialogue, réponds avec un emoji !",
    "Appuie sur la flèche de gauche sur ton clavier pour t'approcher du personnage."
];
let index = 0;
let textIndex = 0

function showText() {
    let textElement = document.getElementById("text")
    if (textElement) {
        textElement.textContent = text[textIndex].slice(0, index);
    }
    index++;

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