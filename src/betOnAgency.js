
const text = [
    "Hello ! Bienvenue dans la salle \"Bet On Agency\". Ici tu découvriras les informations sur l'agence de Niort de Neosoft. ",
    "Tu peux voir une vidéo de présentation de l'agence en te rapprochant de la grande table à gauche dans cette cuisine ! ",
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
    if (textIndex === text.length) {
        document.getElementById("buttonsContainer").style.display = "flex"
    }
    if (textIndex !== text.length) {
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
    
    if (textIndex >= text.length) {
        // document.getElementById("box").style.display = "none";
        window.parent.postMessage({ type: 'closeUIWebsite' }, "*");
        // window.parent.closeFrame();
        return;
    }
    showText();
});