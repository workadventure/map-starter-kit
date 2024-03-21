
const text = "Néosoft s’engage pour la santé des femmes !";
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
const publication = document.getElementById("publication");

button?.addEventListener("click", () => {
    document.getElementById("box").style.display = "none"
});

publication?.addEventListener("click", () => {
    window.open("https://www.neosoft.fr/nos-publications/blog-tech/neosoft-sengage-pour-la-sante-des-femmes-au-travail/", "_blank")
});