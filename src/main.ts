/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;
let timerIframe: any = undefined;
const suspenseStartAudio = WA.sound.loadSound("/audio/suspense-start.mp3");
const soundConfig = {
    volume: 0.25,
    loop: false,
    rate: 1,
    detune: 1,
    delay: 0,
    seek: 0,
    mute: false
  };

// Waiting for the API to be ready
WA.onInit().then(async () => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "Il est " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup);

    setTimeout(() => { // TODO: Remove this timeout and replace player count check
        WA.state.gameStatus = "INIT";
    }, 3000);

    WA.state.onVariableChange('gameStatus').subscribe(async (status) => {
        if(status === "WAITING"){
            console.log('Waiting for players to join the game');
        } else if(status === "INIT"){
            console.log('Game initialized');
            
            timerIframe = await WA.ui.website.open({
                url: "/src/iframes/timer.html",
                position: {
                    vertical: "top",
                    horizontal: "middle",
                },
                margin: {
                    top: "30px",
                },
                size: {
                    height: "123px",
                    width: "123px",
                },
                allowApi: true
            });
        } else if(status === "STARTED"){
            timerIframe.close();
            suspenseStartAudio.play(soundConfig);
            setInterval(() => {
                suspenseStartAudio.stop();
            }, 4000);
            console.log('Game started');
        } else if(status === "FINISHED"){
            console.log('Game finished');
        } else if(status === "STOPPED"){
            console.log('Game stopped');
        }
    });
    
    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
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

export {};
