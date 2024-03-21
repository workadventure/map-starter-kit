/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import "./gates/gate";
import * as Data from "./data/data";
import { AREA } from "./constantes";
import { UIWebsite } from "@workadventure/iframe-api-typings";

console.log('Script started successfully');

let currentPopup: any = undefined;
let currentPrompt: UIWebsite;
let modalOpenTime: number;

WA.player.state.saveVariable("tutoData", []);
WA.player.state.saveVariable("videoAgencyData", []);
WA.player.state.saveVariable("careerAreaData", []);
WA.player.state.saveVariable("agencyAreaData", []);
WA.player.state.saveVariable("EasterEggData", []);
WA.player.state.saveVariable("leaveOnClick", false);

// Waiting for the API to be ready

WA.onInit().then(async () => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags)
    // Autoriser toutes les portes
    WA.room.hideLayer(AREA.DOORS_LAYER.ALL_DOORS_CLOSED)
    WA.room.hideLayer(AREA.DOORS_LAYER.DOOR_CAREER_AREA)
    WA.room.hideLayer(AREA.DOORS_LAYER.DOOR_AGENCY_AREA)
    WA.room.showLayer(AREA.DOORS_LAYER.ALL_DOORS_OPENED)
    // WA.player.state.saveVariable("authorizedRooms", [1])
    WA.player.state.saveVariable("quests", [])

    currentPrompt = await WA.ui.website.open({
        url: "src/welcome.html",
        position: {
            vertical: "bottom",
            horizontal: "middle",
        },
        size: {
            height: "20vh",
            width: "75vw",
        },
        margin: {
            bottom: "15vh",
        },
        allowApi: true,
    });

    // function verifierHeure() {

    //     // Vérifier si l'heure actuelle correspond à l'heure d'action
    //     if (totalSecondes > 0) {
    //         let nbJours = Math.floor(totalSecondes / (60 * 60 * 24));
    //         let nbHeures = Math.floor((totalSecondes - (nbJours * 60 * 60 * 24)) / (60 * 60));
    //         let nbMinutes = Math.floor((totalSecondes - ((nbJours * 60 * 60 * 24 + nbHeures * 60 * 60))) / 60);
    //         let nbSecondes = Math.floor(totalSecondes - ((nbJours * 60 * 60 * 24 + nbHeures * 60 * 60 + nbMinutes * 60)));

    //         let minutes: string | number = 0;
    //         let secondes: string | number = 0;
    //         minutes = caracter(nbMinutes);
    //         secondes = caracter(nbSecondes);

    //         compteur = minutes + ":" + secondes;
    //     }

    //     totalSecondes--;

    //     WA.ui.banner.openBanner({
    //         id: "banner-test",
    //         text: "Votre rendez-vous en visioconférence commence dans " + compteur,
    //         bgColor: "#0055FF",
    //         textColor: "#FFFFFF",
    //         closable: false,
    //         timeToClose: 120000,
    //         link: {
    //             url: "",
    //             label: ""
    //         }

    //     });
    // }

    // function caracter(nb: number) {
    //     return (nb < 10) ? '0' + nb : nb;
    // }

    // // Vérifier l'heure toutes les secondes
    // setInterval(verifierHeure, 1000);

    // Initialisation autorisation des salles

    /*  WA.room.area.onEnter('clock').subscribe(() => {
          const today = new Date();
          const time = today.getHours() + ":" + today.getMinutes();
          currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
      })
  
      WA.room.area.onLeave('clock').subscribe(closePopup) */

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

WA.room.area.onLeave(AREA.FLOOR_LAYER.START_AREA).subscribe(async () => {
    console.log('test')
    await currentPrompt.close();
})

// Message qui s'affiche sur le chat à droite avec le lien du tuto (solution 2)
//WA.chat.sendChatMessage('Bonjour ! Bienvenue à NIORT voici le tutoriel : https://landing.neosoft.fr/discord-0');

WA.room.area.onEnter(AREA.FLOOR_LAYER.TUTO_AREA).subscribe(async () => {

    await currentPrompt.close();

    currentPopup = await WA.ui.modal.openModal({
        title: 'tuto',// mandatory, title of the iframe modal.
        src: "https://landing.neosoft.fr/discord-0", // mandatory, url of the iframe modal.
        position: "center",
        allow: null,
        allowApi: false
    })
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.TUTO_AREA).subscribe(async () => {
    await currentPopup.close();
})

// const today = new Date();
// const time = today.getHours() + ":" + today.getMinutes();
WA.room.area.onEnter(AREA.FLOOR_LAYER.SUPPORT_RH).subscribe(async () => {

    currentPrompt = await WA.ui.website.open({
        url: "src/supportRH.html",
        position: {
            vertical: "bottom",
            horizontal: "middle",
        },
        size: {
            height: "20vh",
            width: "75vw",
        },
        margin: {
            bottom: "15vh",
        },
        allowApi: true
    })
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.SUPPORT_RH).subscribe(async () => {
    await currentPrompt.close();
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_BETTER).subscribe(async () => {
    currentPrompt = await WA.ui.website.open({
        url: "src/betOnBetter.html",
        position: {
            vertical: "bottom",
            horizontal: "middle",
        },
        size: {
            height: "80vh",
            width: "75vw",
        },
        margin: {
            bottom: "15vh",
        },
        allowApi: true
    })
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_BETTER).subscribe(() => {
    currentPrompt.close();
})

// setInterval(async () => { console.log("position :", await WA.player.getPosition()) }, 1000)

WA.room.area.onLeave(AREA.FLOOR_LAYER.TUTO_AREA).subscribe(() => {
    WA.ui.modal.closeModal();
})

WA.room.area.onEnter(AREA.EASTER_EGG.RICK_ROLL).subscribe(() => {

    WA.ui.modal.openModal({
        title: 'rickRoll',// mandatory, title of the iframe modal.
        src: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=opZVDTlwJOw0kQNC&autoplay=1", // mandatory, url of the iframe modal.
        position: "center",
        allow: null,
        allowApi: false,
    })
})

WA.room.area.onLeave(AREA.EASTER_EGG.RICK_ROLL).subscribe(() => {
    WA.ui.modal.closeModal();
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.VIDEO_AGENCY).subscribe(() => {

    modalOpenTime = Date.now();
    WA.room.showLayer(AREA.FLOOR_LAYER.BOT_3_NOTIFICATION)

    WA.ui.modal.openModal({
        title: 'agencyVideo',// mandatory, title of the iframe modal.
        src: "https://www.youtube.com/embed/1OnivPs6c7I?si=fcM3eA5jiw5vQ6Us",
        position: "center",
        allow: null,
        allowApi: false,
    }, () => {
        WA.state.saveVariable("leaveOnClick", true);
        Data.closeModalCallback(modalOpenTime, "videoAgencyData", 695, 1255, 10);
    })
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.VIDEO_AGENCY).subscribe(() => {
    let leftOnClick = WA.state.loadVariable("leaveOnClick")
    // leaveOnclick is by default set to 'false'
    // Check leaveOnClick state to make sure that the closeModalCallback doesnt get called twice :
    // Once on button close and a second time on leaving the area
    leftOnClick ? WA.ui.modal.closeModal() : Data.closeModalCallback(modalOpenTime, "videoAgencyData");
    // At the end, reset leaveOnClick back to false
    WA.state.saveVariable("leaveOnClick", false);
    console.log("leftonclick reset", leftOnClick)
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_TALENT).subscribe(async () => {

    currentPrompt = await WA.ui.website.open({
        url: "src/betOnTalent.html",
        position: {
            vertical: "bottom",
            horizontal: "middle",
        },
        size: {
            height: "20vh",
            width: "75vw",
        },
        margin: {
            bottom: "15vh",
        },
        allowApi: true
    })

})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_TALENT).subscribe(async () => {
    await currentPrompt.close();
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.CAREER_AREA).subscribe(() => {

})

WA.room.area.onLeave(AREA.FLOOR_LAYER.CAREER_AREA).subscribe(() => {

})

WA.room.area.onEnter(AREA.FLOOR_LAYER.AGENCY_AREA).subscribe(() => {

    modalOpenTime = Date.now();

    WA.ui.modal.openModal({
        title: 'agencyPage',// mandatory, title of the iframe modal.
        src: "https://landing.neosoft.fr/bet-on-niort",
        position: "center",
        allow: null,
        allowApi: false
    }, () => {
        Data.closeModalCallback(modalOpenTime, "agencyAreaData", 2094, 385.5, 10);
        //onClose modal move player to specified position on map
    })
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.AGENCY_AREA).subscribe(() => {
    let leftOnClick = WA.state.loadVariable("leaveOnClick")
    leftOnClick ? WA.ui.modal.closeModal() : Data.closeModalCallback(modalOpenTime, "agencyAreaData");
    WA.state.saveVariable("leaveOnClick", false);
    console.log("leftonclick reset", leftOnClick)
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_AGENCY).subscribe(async () => {

    currentPrompt = await WA.ui.website.open({
        url: "src/betOnAgency.html",
        position: {
            vertical: "bottom",
            horizontal: "middle",
        },
        size: {
            height: "20vh",
            width: "75vw",
        },
        margin: {
            bottom: "15vh",
        },
        allowApi: true
    })

    function closeFrame(){
        currentPrompt.close();
    }

    window.addEventListener('message', function(e) {
        // console.log("emessage", e.data)
        
        
        if (e.data.type === 'closeUIWebsite') {
            // if (e.data.type === 'closePrompt') {
            if (currentPrompt) {
                currentPrompt.close();
            }
        }
    });

})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_AGENCY).subscribe(async () => {
    await currentPrompt.close();
})

document.getElementById('next')?.addEventListener('click', () => {
    currentPrompt.close();
});

// function closePopup(){
//     if (currentPopup !== undefined) {
//         currentPopup.close();
//         currentPopup = undefined;
//     }
// }

export { currentPopup };
