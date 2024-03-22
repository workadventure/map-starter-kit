
const text = [
    "« Aujourd'hui, la bonne stratégie SI est celle qui permet d'allier les avantages de chaque modèle de ressources informatiques (Infra & Cloud) aux usages, en prenant en compte la manière dont les produits et les services sont consommés. » - Rémy Roux, Practice Leader Infra & Cloud"
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