/// <reference types="@workadventure/iframe-api-typings" />

console.log('Script started successfully');


const registrationArea = document.getElementById("registrationArea") as HTMLTextAreaElement;
const saveButton = document.getElementById("inscrire") as HTMLButtonElement;

const firstName = document.getElementById("firstName") as HTMLInputElement;
const lastName = document.getElementById("lastName") as HTMLInputElement;
const username = document.getElementById("username") as HTMLInputElement;
const phone = document.getElementById("phone") as HTMLInputElement;
const email = document.getElementById("email") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    
    saveButton.addEventListener("click", () => {
        if (firstName.value === "" || lastName.value === "" || email.value === "" || password.value === "") {
            alert("Veuillez remplir les champs obligatoires");
        } else {
            alert("Inscription réussie");
            WA.player.state.firstName = firstName.value;
            WA.player.state.lastName = lastName.value;
            WA.player.state.username = username.value;
            WA.player.state.phone = phone.value;
            WA.player.state.email = email.value;
            WA.player.state.password = password.value;
            alert(JSON.stringify(WA.player.state));
        }
    });

}).catch(e => console.error(e));

export {};