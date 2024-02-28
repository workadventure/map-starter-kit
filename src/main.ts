/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import "./gates/gate"
import { AREA } from "./constantes";

console.log('Script started successfully');

let currentPopup: any = undefined;
let compteur: string = "";
var maintenant: any = new Date();
// Par défaut : maintenant + 15 minutes
var fin: any = new Date();
fin.setHours(maintenant.getHours()); 
fin.setMinutes(maintenant.getMinutes() + 15);
fin.setSeconds(maintenant.getSeconds()); 
let totalSecondes = (fin - maintenant) / 1000;

// Waiting for the API to be ready

WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags)

    function verifierHeure() {
            // Vérifier si l'heure actuelle correspond à l'heure d'action
            if (totalSecondes > 0) {
                let nbJours = Math.floor(totalSecondes / (60 * 60 * 24));
                let nbHeures = Math.floor((totalSecondes - (nbJours * 60 * 60 * 24)) / (60 * 60));
                let nbMinutes = Math.floor((totalSecondes - ((nbJours * 60 * 60 * 24 + nbHeures * 60 * 60))) / 60);
                let nbSecondes = Math.floor(totalSecondes - ((nbJours * 60 * 60 * 24 + nbHeures * 60 * 60 + nbMinutes * 60)));

                let minutes: string | number = 0;
                let secondes: string | number = 0;
                minutes = caracter(nbMinutes);
                secondes = caracter(nbSecondes);
            
                compteur = minutes + ":" + secondes; 
            }

            totalSecondes--;
            
            WA.ui.banner.openBanner({
                id: "banner-test",
                text: "Votre rendez-vous en visioconférence commence dans " + compteur,
                bgColor: "#0055FF",
                textColor: "#FFFFFF",
                closable: false,
                timeToClose: 120000,
                link:  {
                    url: "",
                    label: ""
                }
            });


    }

    function caracter(nb: number){ 
        return (nb < 10) ? '0'+ nb : nb;
    }

    // Vérifier l'heure toutes les secondes
    setInterval(verifierHeure, 1000);

    // Initialisation autorisation des salles
    WA.player.state.saveVariable("authorizedRooms", [1])
    WA.player.state.saveVariable("quests", [])
    WA.ui.modal.openModal({
        title: 'tuto',// mandatory, title of the iframe modal.
        src: "https://landing.neosoft.fr/discord-0", // mandatory, url of the iframe modal.
        position: "center",
        allow: null,
        allowApi: false
      })

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


// Message qui s'affiche sur le chat à droite avec le lien du tuto (solution 2)
//WA.chat.sendChatMessage('Bonjour ! Bienvenue à NIORT voici le tutoriel : https://landing.neosoft.fr/discord-0');

WA.room.area.onEnter(AREA.FLOOR_LAYER.SUPPORT_RH).subscribe(async () => {

    currentPopup = WA.ui.openPopup(AREA.FLOOR_LAYER.SUPPORT_RH, "Besoin d'aide pour trouver la première étape ?", [{
        label: "Aidez moi par pitié !",
        className: "primary",
        callback: (popup) => {
            popup.close();
            WA.player.moveTo(422, 590, 10);
        }
    }]);
})

// const currentPlayerPosition = await WA.player.getPosition();
// console.log("my position :", await WA.player.getPosition());

// setInterval(async () => { console.log("position :", await WA.player.getPosition()) }, 1000)
WA.room.area.onEnter(AREA.FLOOR_LAYER.TUTO_AREA).subscribe(() => {

    WA.ui.modal.openModal({
        title: 'tuto',// mandatory, title of the iframe modal.
        src: "https://landing.neosoft.fr/discord-0", // mandatory, url of the iframe modal.
        position: "center",
        allow: null,
        allowApi: false
    })
})

WA.room.area.onEnter(AREA.EASTER_EGG.RICK_ROLL).subscribe(() => {

    WA.ui.modal.openModal({
        title: 'rickRoll',// mandatory, title of the iframe modal.
        src: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=opZVDTlwJOw0kQNC&autoplay=1", // mandatory, url of the iframe modal.
        position: "center",
        allow: null,
        allowApi: false
    })
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.VIDEO_AGENCY).subscribe(() => {
    WA.ui.modal.openModal({
        title: 'agencyVideo',// mandatory, title of the iframe modal.
        src: "https://www.youtube.com/embed/1OnivPs6c7I?si=fcM3eA5jiw5vQ6Us",
        position: "center",
        allow: null,
        allowApi: false
    })
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.HELP_TO_NEXT_STEP).subscribe(async () => {

    if ((WA.player.state.authorizedRooms as number[]).includes(2)) {
        currentPopup = WA.ui.openPopup(AREA.FLOOR_LAYER.HELP_TO_NEXT_STEP, "Besoin d'aide pour trouver la seconde étape ?", [{
            label: "Aidez moi par pitié !",
            className: "primary",
            callback: (popup) => {
                popup.close();
                WA.player.moveTo(680, 1275, 10);
            }
        }]);
    }
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.HELP_CAREER_AREA).subscribe(async () => {
    
    if ((WA.player.state.authorizedRooms as number[]).includes(2)) {
        currentPopup = WA.ui.openPopup(AREA.FLOOR_LAYER.HELP_CAREER_AREA, "Besoin d'aide pour trouver la troisième étape ?", [{
            label: "Aidez moi par pitié !",
            className: "primary",
            callback: (popup) => {
                popup.close();
                WA.player.moveTo(774, 224, 10);
            }
        }]);
    }
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.CAREER_AREA).subscribe(() => {
    WA.ui.modal.openModal({
        title: 'carerrPage',// mandatory, title of the iframe modal.
        src: "https://landing.neosoft.fr/bet-on-talent",
        position: "center",
        allow: null,
        allowApi: false
    })
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.AGENCY_AREA).subscribe(() => {
    WA.ui.modal.openModal({
        title: 'agencyPage',// mandatory, title of the iframe modal.
        src: "https://landing.neosoft.fr/bet-on-niort",
        position: "center",
        allow: null,
        allowApi: false
    })
})

/*function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}**/

export { };
