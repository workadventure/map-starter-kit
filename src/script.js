const text = [
    "Bonjour et bienvenue sur la map intéractive de notre agence Neosoft Niort !",
    "Tout d'abord, voici un tutoriel qui vous expliquera comment vous déplacer sur la carte."
];
let index = 0;
let textIndex = 0

function showText() {
    document.getElementById("text").textContent = text[textIndex].slice(0, index);
    index++;

    if (index <= text[textIndex].length) {
        setTimeout(showText, 50);
    } else {
        document.getElementById("next").hidden = false;
    }
}

showText();

const button = document.querySelector("button");

button.addEventListener("click", () => {
    document.getElementById("next").hidden = true;
    index = 0;
    textIndex++;
    showText();
});