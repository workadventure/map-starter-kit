
const text = [
    "Hello ! Bienvenue dans la salle \"Bet On Talent\". Ici tu découvriras les informations sur les opportunités de carrière chez Neosoft. ",
    "Tout d'abord, mot de Barbara, la directrice du développement RH : ",
    "\"Engager nos talents dans une culture d'apprentissage, c'est leur offrir la possibilité de passer de l'intention à l'action : explorer de nouvelles compétences, accéder à des expériences novatrices au service de leur développement de carrière et celui de l'entreprise.\" - Barbara Breit, la directrice du développement RH  ",
    "Tu peux aussi visiter nos différentes pages :"
];

let index = 0;
let textIndex = 0

function showText() {
    let textElement = document.getElementById("text")
    if (textElement) {

        textElement.textContent = text[textIndex].slice(0, index);
    }
    index++;

    console.log(textIndex)
    if (textIndex === 3) {
        document.getElementById("buttonsContainer").style.display = "flex"
    }
    if (textIndex !== 3) {
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

const button = document.getElementById("next");

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


const pacte = document.getElementById("pacte")
const career = document.getElementById("career")

pacte?.addEventListener("click", () => {
    window.open("https://www.neosoft.fr/pourquoi-rejoindre-neosoft/", "_blank")
})

career?.addEventListener("click", () => {
    window.open("https://www.neosoft.fr/votre-carriere-chez-neosoft", "_blank")
})