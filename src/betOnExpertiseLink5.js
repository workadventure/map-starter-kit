
const text = [
    "« J'ai rejoint Neosoft pour concrétiser un projet qui me tenait à cœur depuis longtemps : fédérer un réseau de spécialistes en capacité à construire des solutions communes, innovantes et plus green pour nos clients » - Nicolas Huche, Practice Leader Data "
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