
const text = [
    "Te voilà dans la salle “Bet on Expertise”. Tu trouveras ici des informations sur les différentes communautés d'expert de Neosoft. Tu peux regarder les différentes vidéos sur chacune de nos expertises sur les différents ordinateurs dans cette pièce. "
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