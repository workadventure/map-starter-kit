
const text = [
    "« Notre communauté DevOps est composée d'experts possédant de solides retours d'expérience. Nous accompagnons nos collaborateurs dans leur montée en compétence afin de proposer à nos clients les meilleures solutions possibles. » - Mladen Peric, Practice Leader DevOps"
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