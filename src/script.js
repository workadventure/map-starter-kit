// import { currentPopup } from "./main";

console.log('test')

const text = [
    "Bonjour jeune Padawan, et bienvenue sur la map intéractive de notre agence Neosoft Niort !",
    "Ta mission sera grande, il te faudra trouver et apprendre à travers une quête pleine d'aventures... Mais ne t'inquiète surtout pas : à Néosoft, une aide sera toujours apporté à ceux qui la demandent.",
    "Oh, j'allais oublier !",
    "Avant de partir vivre ce voyage inattendu, laisse moi te montrer un tutoriel qui t'expliquera tout ce que tu peux faire ici avant l'ultime boss final (qui est très gentil, dit en passant) :"
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
        setTimeout(showText, 50);
    } else {
        let nextButton = document.getElementById("next")
        if (nextButton) {
            nextButton.hidden = false;
        }
        console.log('close')
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
    showText();
});