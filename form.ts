/// <reference types="@workadventure/iframe-api-typings" />

console.log("Script started successfully");

const registrationArea = document.getElementById("registrationArea") as HTMLTextAreaElement;
const saveButton = document.getElementById("inscrire") as HTMLButtonElement;

const firstName = document.getElementById("firstName") as HTMLInputElement;
const lastName = document.getElementById("lastName") as HTMLInputElement;
const phone = document.getElementById("phone") as HTMLInputElement;
const email = document.getElementById("email") as HTMLInputElement;
const age = document.getElementById("age") as HTMLInputElement;
const gender = document.getElementById("gender") as HTMLInputElement;
const searching = document.getElementById("searching") as HTMLInputElement;

// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    console.log("Scripting API ready");
    console.log(WA.state.players);

    saveButton.addEventListener("click", () => {
      if (firstName.value === "" || lastName.value === "" || email.value === "") {
        alert("Veuillez remplir les champs obligatoires");
      } else {
        alert("Inscription réussie");
        WA.player.state.firstName = firstName.value;
        WA.player.state.lastName = lastName.value;
        WA.player.state.phone = phone.value;
        WA.player.state.email = email.value;
        WA.player.state.age = age.value;
        WA.player.state.gender = gender.value;
        WA.player.state.searching = searching.value;
        // WA.player.state.id = WA.state.loadVariable('indexPlayers');

        WA.state.saveVariable("players", {
          ...WA.state.loadVariable("players"),
          [WA.state.loadVariable("indexPlayers")]: {
            firstName: WA.player.state.firstName,
            lastName: WA.player.state.lastName,
            age: WA.player.state.age,
            gender: WA.player.state.gender,
            searching: WA.player.state.searching,
            email: WA.player.state.email,
            phone: WA.player.state.phone,
          },
        });
        WA.state.saveVariable("indexPlayers", WA.state.loadVariable("indexPlayers") + 1);

        console.log(WA.state.players);
      }
    });
  })
  .catch((e) => console.error(e));

export {};
