
const text = [
    "Hello ! Bienvenue dans la salle \"Bet On Better\". Ici tu trouveras une présentation générale de Neosoft.",
    "Tout d'abord, un petit mot de Soïg, le président de NeoSoft.",
    "Tu peux aussi regarder la vidéo de présentation de l'entreprise en t'approchant du PC à côté de moi."
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