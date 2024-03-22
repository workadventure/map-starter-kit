
const text = 
"Te voilà dans la salle “Bet on You”. Ici tu trouveras nos ressources et publications, telles que des articles et des livres blancs. Qu’aimerais-tu faire ? "
let index = 0;
let textIndex = 0

function showText() {
    let textElement = document.getElementById("text")
    if (textElement) {
        textElement.textContent = text.slice(0, index);
    }

    index++;

    if (index < text.slice().length) {
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

const livres = document.getElementById("livres")
const articles = document.getElementById("articles")
const events = document.getElementById("events")

livres?.addEventListener("click", () => {
    window.open("https://www.neosoft.fr/nos-publications/livres-blancs-et-refcards/", "_blank")
})

articles?.addEventListener("click", () => {
    window.open("https://www.neosoft.fr/nos-publications/blog-tech", "_blank")
})

events?.addEventListener("click", () => {
    window.open("https://www.neosoft.fr/nos-publications/evenements/", "_blank")
})