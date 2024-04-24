/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;
let formWebsite: any = undefined;

let index: string = "azeaze";
console.log("on vient de load !!!!!!!!!!!");

WA.state.saveVariable('players', {
    "0" :{
        age: "29",
        gender: "homme",
        searching: "femme",
        firstName: "Mark",
        lastName: "Paul",
        email: "email@gmail.com",
        phone: "0601010101",
    }
})

WA.onInit().then(() => {
    WA.room.area.onEnter("registrationArea").subscribe(async () => {
        console.log("Entering visibleNote layer");

        formWebsite = await WA.ui.website.open({
            url: "./form.html",
            position: {
                vertical: "top",
                horizontal: "middle",
            },
            size: {
                height: "60vh",
                width: "50vw",
            },
            margin: {
                top: "10vh",
            },
            allowApi: true,
        });
    });

    WA.room.area.onLeave("registrationArea").subscribe(() => {
        formWebsite.close();
    })




    //code Nicolas
    WA.room.area.onEnter('showPlayer').subscribe(openPopup)
    WA.room.area.onEnter('validatePlayer').subscribe(() => {
        console.log(WA.state.players);
        
        const hasPlayers = Array.isArray(WA.state.players) && WA.state.players.length > 0;
        // const isValidIndex = index >= 0 && index < WA.state.players.length;
        
        if (hasPlayers) {
            const playerName = WA.state.players[WA.state.loadVariable('index')].firstName + WA.state.players[WA.state.loadVariable('index')].lastName;
            WA.ui.openPopup("validatePlayerPopup", `${playerName}, on y va !`, []);
        }
    })
    WA.room.area.onEnter('nextPlayer').subscribe(() => {
        closePopup()
        WA.state.saveVariable('index', WA.state.loadVariable('index') + 1)
        openPopup()
    })

    WA.room.area.onLeave('showPlayer').subscribe(closePopup)
    //fin code nicolas



    
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

function openPopup() {
    try {
        currentPopup = WA.ui.openPopup("playersPopup", displayNotes(WA.state.loadVariable("players")[WA.state.loadVariable('index')]), []);
    } catch (e) {
        currentPopup = WA.ui.openPopup("playersPopup", "Il n'y a pas de prétendant(e)", []);
    }
}

function displayNotes(player: {firstName: string, lastName: string, age: string, gender: string, searching: string}){
    return player.firstName + player.lastName + ", " + player.age + " ans\n" + player.gender.capitalize() + " cherche " + player.searching
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};


export {};
