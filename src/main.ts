/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready


WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    function verifierHeure() {
        // Obtenir l'heure actuelle
        var maintenant = new Date();
      
        // Définir l'heure à laquelle tu souhaites déclencher l'action
        var heureAction1 = new Date();
        heureAction1.setHours(15); // Heure : 0 (exemple)
        heureAction1.setMinutes(35); // Minutes : 1 (exemple)
        heureAction1.setSeconds(0); // Secondes : 0 (exemple)

        var heureAction2 = new Date();
        heureAction2.setHours(12); // Heure : 0 (exemple)
        heureAction2.setMinutes(45); // Minutes : 0 (exemple)
        heureAction2.setSeconds(0); // Secondes : 0 (exemple)
      
        // Vérifier si l'heure actuelle correspond à l'heure d'action
        if (maintenant.getTime() === heureAction1.getTime()) {
          // Déclencher ton action ici
          //console.log("Action déclenchée à l'heure précise !");
          //WA.chat.sendChatMessage("Action déclenchée à l'heure précise !", " Mr Robot");
          WA.ui.banner.openBanner({
            id: "banner-test",
            text: "On va bientôt commencer, rendez-vous dans l'amphi ! :)",
            bgColor: "#0055FF",
            textColor: "#FFFFFF",
            closable: false
        });
        } else if (maintenant.getTime() === heureAction2.getTime()) {
            // Déclencher ton action ici
            //console.log("Action déclenchée à l'heure précise !");
            //WA.chat.sendChatMessage("Action déclenchée à l'heure précise !", " Mr Robot");
            WA.ui.banner.openBanner({
              id: "banner-test",
              text: "C'est bientôt la fin... Rendez-vous dans l'amphi pour la conclusion !",
              bgColor: "#0055FF",
              textColor: "#FFFFFF",
              closable: false
          });
          } //else {
            // Aucune des heures n'est encore passée
            //console.log("Aucune des heures n'est encore passée.");
        //}
    }
      // Vérifier l'heure toutes les secondes
      setInterval(verifierHeure, 1000);

      // Initialisation autorisation des salles
      WA.player.state.saveVariable("authorizedRooms", [1])

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

WA.room.area.onEnter('supportrh').subscribe(() => {
    // const today = new Date();
    // const time = today.getHours() + ":" + today.getMinutes();
    currentPopup = WA.ui.openPopup("supportrhPopup", "Bonjour ! Si vous rencontrer un problème n'hésitez pas à envoyer un mail au support niort.pacman@neosoft.fr", [{
        label: "OK !",
        className: "primary",
        callback: (popup) => {
            popup.close();
        }
    }]);
})

WA.room.area.onEnter('supportrhPopup').subscribe(() => {
    if ((WA.player.state.authorizedRooms as number[]).includes(1) 
    && !(WA.player.state.authorizedRooms as number[]).includes(2)) {
        WA.player.state.saveVariable("authorizedRooms", [1, 2])
    }
    console.log('Player: ', WA.player.state.authorizedRooms)
})

WA.room.area.onEnter('careerArea').subscribe(() => {
    if ((WA.player.state.authorizedRooms as number[]).includes(1)
    && (WA.player.state.authorizedRooms as number[]).includes(2)
    && !(WA.player.state.authorizedRooms as number[]).includes(3)) {
        (WA.player.state.authorizedRooms as number[]).push(3)
    }
    console.log('Player: ', WA.player.state.authorizedRooms)
})

WA.room.area.onEnter('agencyArea').subscribe(() => {
    if ((WA.player.state.authorizedRooms as number[]).includes(1)
    && (WA.player.state.authorizedRooms as number[]).includes(2)
    && (WA.player.state.authorizedRooms as number[]).includes(3)
    && !(WA.player.state.authorizedRooms as number[]).includes(4)) {
        (WA.player.state.authorizedRooms as number[]).push(4)
    }
    console.log('Player: ', WA.player.state.authorizedRooms)
})


/*function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}**/

export {};
