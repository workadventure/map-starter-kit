
const text = [
    "Hello ! Bienvenue dans la salle \"Bet On Niort\". Ici tu découvriras une présentation de l'agence de Niort. ",
    "Tout d'abord, mot de Barbara, la directrice du développement RH.",
    "Tu peux visiter notre page carrière en t'approchant de la télé dans cette salle."
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