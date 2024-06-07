/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import "./gates/gate";
// import * as Data from "./data/data";
import { AREA } from "./constantes";
import { UIWebsite } from "@workadventure/iframe-api-typings";

console.log('Script started successfully');

let currentPopup : any = undefined;
// let currentPrompt: UIWebsite;
// let modalOpenTime: number;

WA.player.state.saveVariable("tutoData", []);
WA.player.state.saveVariable("videoAgencyData", []);
WA.player.state.saveVariable("careerAreaData", []);
WA.player.state.saveVariable("agencyAreaData", []);
WA.player.state.saveVariable("cloudVideoData", []);
WA.player.state.saveVariable("devopsVideoData", []);
WA.player.state.saveVariable("cyberVideoData", []);
WA.player.state.saveVariable("agiliteVideoData", []);
WA.player.state.saveVariable("dataVideoData", []);
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
    boiteDeDialogue("src/welcome.html")
    // currentPrompt = await WA.ui.website.open({
    //     url: "src/welcome.html",
    //     position: {
    //         vertical: "bottom",
    //         horizontal: "middle",
    //     },
    //     size: {
    //         height: "20vh",
    //         width: "75vw",
    //     },
    //     margin: {
    //         bottom: "15vh",
    //     },
    //     allowApi: true,
    // });

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
    //closeAllPrompts();
    //closeAllPrompts();;
})

// Message qui s'affiche sur le chat à droite avec le lien du tuto (solution 2)
//WA.chat.sendChatMessage('Bonjour ! Bienvenue à NIORT voici le tutoriel : https://landing.neosoft.fr/discord-0');

WA.room.area.onEnter(AREA.FLOOR_LAYER.TUTO_AREA).subscribe(async () => {

    closeAllPrompts();
    //await closeAllPrompts();;

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
    boiteDeDialogue("src/supportRH.html");
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.SUPPORT_RH).subscribe(async () => {
    closeAllPrompts();
    //closeAllPrompts();;
    //await closeAllPrompts();;
})

//BETONYOUAERA 
// const today = new Date();
// const time = today.getHours() + ":" + today.getMinutes();
WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_YOU).subscribe(async () => {

    boiteDeDialogue("src/betOnYouArea.html");
    // currentPrompt = await WA.ui.website.open({
    //     url: "src/betOnYouArea.html",
    //     position: {
    //         vertical: "bottom",
    //         horizontal: "middle",
    //     },
    //     size: {
    //         height: "20vh",
    //         width: "75vw",
    //     },
    //     margin: {
    //         bottom: "15vh",
    //     },
    //     allowApi: true
    // })
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_YOU).subscribe(async () => {
    closeAllPrompts();
    //await closeAllPrompts();;
})


//Les autres ajout link betOnYouLink1
WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_YOU_LINK1).subscribe(async () => {
    boiteDeDialogue("src/betOnYouLink1.html","20vh", "76vw")
    // currentPrompt = await WA.ui.website.open({
    //     url: "src/betOnYouLink1.html",
    //     position: {
    //         vertical: "bottom",
    //         horizontal: "middle",
    //     },
    //     size: {
    //         height: "20vh",
    //         width: "75vw",
    //     },
    //     margin: {
    //         bottom: "15vh",
    //     },
    //     allowApi: true
    // })

})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_YOU_LINK1).subscribe(async () => {
    closeAllPrompts();
    //await closeAllPrompts();;
})


WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_FUTUR_LINK_1).subscribe(async () => {
    closeAllPrompts();
    //await closeAllPrompts();;
})

//Les autres ajout link betOnYouLink2
WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_YOU_LINK2).subscribe(async () => {

    boiteDeDialogue("src/betOnYouLink2.html","20vh", "76vw")
    // currentPrompt = await WA.ui.website.open({
    //     url: "src/betOnYouLink2.html",
    //     position: {
    //         vertical: "bottom",
    //         horizontal: "middle",
    //     },
    //     size: {
    //         height: "20vh",
    //         width: "75vw",
    //     },
    //     margin: {
    //         bottom: "15vh",
    //     },
    //     allowApi: true
    // })

})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_YOU_LINK2).subscribe(async () => {
    closeAllPrompts();
    //await closeAllPrompts();;
})


WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_FUTUR_LINK_2).subscribe(async () => {
    closeAllPrompts();
    //await closeAllPrompts();;
})


//Les autres ajout link betOnYouLink3
WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_YOU_LINK3).subscribe(async () => {

    boiteDeDialogue("src/betOnYouLink3.html","20vh", "76vw")
    // currentPrompt = await WA.ui.website.open({
    //     url: "src/betOnYouLink3.html",
    //     position: {
    //         vertical: "bottom",
    //         horizontal: "middle",
    //     },
    //     size: {
    //         height: "20vh",
    //         width: "75vw",
    //     },
    //     margin: {
    //         bottom: "15vh",
    //     },
    //     allowApi: true
    // })

})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_YOU_LINK3).subscribe(async () => {
    closeAllPrompts();
    //await closeAllPrompts();;
})


WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_FUTUR_LINK_3).subscribe(async () => {
    closeAllPrompts();
    //await closeAllPrompts();;
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_BETTER).subscribe(async () => {

    boiteDeDialogue("src/betOnBetter.html", "90vh", "76vw");
})




WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_BETTER).subscribe(() => {
    closeAllPrompts();
    //await closeAllPrompts();;
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

    // modalOpenTime = Date.now();
    WA.room.showLayer(AREA.FLOOR_LAYER.BOT_3_NOTIFICATION)

    WA.ui.modal.openModal({
        title: 'agencyVideo',// mandatory, title of the iframe modal.
        src: "https://www.youtube.com/embed/1OnivPs6c7I?si=fcM3eA5jiw5vQ6Us",
        position: "center",
        allow: null,
        allowApi: false,
    }, () => {
        WA.state.saveVariable("leaveOnClick", true);
        // Data.closeModalCallback(modalOpenTime, "videoAgencyData", 695, 1255, 10);
    })
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.VIDEO_AGENCY).subscribe(() => {
    let leftOnClick = WA.state.loadVariable("leaveOnClick")
    // leaveOnclick is by default set to 'false'
    // Check leaveOnClick state to make sure that the closeModalCallback doesnt get called twice :
    // Once on button close and a second time on leaving the area
    // leftOnClick ? WA.ui.modal.closeModal() : Data.closeModalCallback(modalOpenTime, "videoAgencyData");
    // At the end, reset leaveOnClick back to false
    WA.state.saveVariable("leaveOnClick", false);
    console.log("leftonclick reset", leftOnClick)
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_TALENT).subscribe(async () => {

    boiteDeDialogue("src/betOnTalent.html", "75vh", "76vw");
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_TALENT).subscribe(async () => {
    closeAllPrompts();
    //await closeAllPrompts();;
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.CAREER_AREA).subscribe(() => {
    console.log("test n°2")
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.CAREER_AREA).subscribe(() => {

})

WA.room.area.onEnter(AREA.FLOOR_LAYER.AGENCY_AREA).subscribe(() => {

    // modalOpenTime = Date.now();

    WA.ui.modal.openModal({
        title: 'agencyPage',// mandatory, title of the iframe modal.
        src: "https://www.youtube.com/embed/5pJA1LPln2Q?si=fbc3rVS91R7-gg-z",
        position: "center",
        allow: null,
        allowApi: false
    }, () => {
        // Data.closeModalCallback(modalOpenTime, "agencyAreaData", 2094, 385.5, 10);
        //onClose modal move player to specified position on map
    })
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.AGENCY_AREA).subscribe(() => {
    // let leftOnClick = WA.state.loadVariable("leaveOnClick")
    // leftOnClick ? WA.ui.modal.closeModal() : Data.closeModalCallback(modalOpenTime, "agencyAreaData");
    WA.state.saveVariable("leaveOnClick", false);
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_AGENCY).subscribe(async () => {
    boiteDeDialogue("src/betOnAgency.html");

    // window.addEventListener('message', function (e) {
    //     // console.log("emessage", e.data)
    //     // console.log("prompt",currentPrompt)
    //     if (e.data.type === 'closeUIWebsite') {
    //         if (currentPrompt) {
    //             //closeAllPrompts();
    //             closeAllPrompts();;
    //             console.log('prompteur fermé')
    //         }
    //     }
    // });

})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_AGENCY).subscribe(async () => {
    closeAllPrompts();
    //await closeAllPrompts();;
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_EXPERTISE_VIDEO1).subscribe(() => {

    // modalOpenTime = Date.now();

    WA.ui.modal.openModal({
        title: 'videoPracticeCloud',
        src: "https://www.youtube.com/embed/OxnPvT5mzS8?si=rCsVFgItB3UvEJeQ",
        position: "center",
        allow: null,
        allowApi: false
    }, () => {
        // Data.closeModalCallback(modalOpenTime, "cloudVideoData");
    })
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_EXPERTISE_VIDEO1).subscribe(() => {
    // let leftOnClick = WA.state.loadVariable("leaveOnClick")
    // leftOnClick ? WA.ui.modal.closeModal() : Data.closeModalCallback(modalOpenTime, "cloudVideoData");
    WA.state.saveVariable("leaveOnClick", false);
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_EXPERTISE_VIDEO2).subscribe(() => {

    // modalOpenTime = Date.now();

    WA.ui.modal.openModal({
        title: 'videoPracticeDevops',// mandatory, title of the iframe modal.
        src: "https://www.youtube.com/embed/b4hgCNsJlD8?si=Vdz0z7aprYsteIDx",
        position: "center",
        allow: null,
        allowApi: false
    }, () => {
        // Data.closeModalCallback(modalOpenTime, "devopsVideoData");
    })
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_EXPERTISE_VIDEO2).subscribe(() => {
    // let leftOnClick = WA.state.loadVariable("leaveOnClick")
    // leftOnClick ? WA.ui.modal.closeModal() : Data.closeModalCallback(modalOpenTime, "devopsVideoData");
    WA.state.saveVariable("leaveOnClick", false);
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_EXPERTISE_VIDEO3).subscribe(() => {

    // modalOpenTime = Date.now();

    WA.ui.modal.openModal({
        title: 'videoPracticeCyber',// mandatory, title of the iframe modal.
        src: "https://www.youtube.com/embed/tilQXxlJWVE?si=kiChXpRdlBVP-TL5",
        position: "center",
        allow: null,
        allowApi: false
    }, () => {
        // Data.closeModalCallback(modalOpenTime, "cyberVideoData");
    })
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_EXPERTISE_VIDEO3).subscribe(() => {
    // let leftOnClick = WA.state.loadVariable("leaveOnClick")
    // leftOnClick ? WA.ui.modal.closeModal() : Data.closeModalCallback(modalOpenTime, "cyberVideoData");
    WA.state.saveVariable("leaveOnClick", false);
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_EXPERTISE_VIDEO4).subscribe(() => {

    // modalOpenTime = Date.now();

    WA.ui.modal.openModal({
        title: 'videoPracticeAgilite',// mandatory, title of the iframe modal.
        src: "https://www.youtube.com/embed/6irwlk9Smv8?si=1dGdDRqj_w7NWS9H",
        position: "center",
        allow: null,
        allowApi: false
    }, () => {
        // Data.closeModalCallback(modalOpenTime, "agiliteVideoData");
    })
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_EXPERTISE_VIDEO4).subscribe(() => {
    // let leftOnClick = WA.state.loadVariable("leaveOnClick")
    // leftOnClick ? WA.ui.modal.closeModal() : Data.closeModalCallback(modalOpenTime, "agiliteVideoData");
    WA.state.saveVariable("leaveOnClick", false);
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_EXPERTISE_VIDEO5).subscribe(() => {

    // modalOpenTime = Date.now();

    WA.ui.modal.openModal({
        title: 'videoPracticeData',// mandatory, title of the iframe modal.
        src: "https://www.youtube.com/embed/dgHbKOAgSpA?si=WzSw2LIRbeDzRFBy",
        position: "center",
        allow: null,
        allowApi: false
    }, () => {
        // Data.closeModalCallback(modalOpenTime, "dataVideoData");
    })
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_EXPERTISE_VIDEO5).subscribe(() => {
    // let leftOnClick = WA.state.loadVariable("leaveOnClick")
    // leftOnClick ? WA.ui.modal.closeModal() : Data.closeModalCallback(modalOpenTime, "dataVideoData");
    WA.state.saveVariable("leaveOnClick", false);
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_EXPERTISE).subscribe(async () => {
    boiteDeDialogue("src/betOnExpertise.html");

})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_EXPERTISE).subscribe(async () => {
    closeAllPrompts();
});

WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_EXPERTISE_CITATION1).subscribe(async () => {
    boiteDeDialogue("src/betOnExpertiseLink1.html","30vh");
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_EXPERTISE_CITATION1).subscribe(async () => {
    closeAllPrompts();
});

WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_EXPERTISE_CITATION2).subscribe(async () => {
    boiteDeDialogue("src/betOnExpertiseLink2.html","30vh");
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_EXPERTISE_CITATION2).subscribe(async () => {
    closeAllPrompts();
});

WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_EXPERTISE_CITATION3).subscribe(async () => {
    boiteDeDialogue("src/betOnExpertiseLink3.html","30vh");
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_EXPERTISE_CITATION3).subscribe(async () => {
    closeAllPrompts();
});

WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_EXPERTISE_CITATION4).subscribe(async () => {
    boiteDeDialogue("src/betOnExpertiseLink4.html","30vh");
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_EXPERTISE_CITATION4).subscribe(async () => {
    closeAllPrompts();
});

WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_EXPERTISE_CITATION5).subscribe(async () => {
    boiteDeDialogue("src/betOnExpertiseLink1.html","30vh");

})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_EXPERTISE_CITATION5).subscribe(async () => {
    closeAllPrompts();
});

WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_FUTUR).subscribe(async () => {
    boiteDeDialogue("src/betOnFutur.html");
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_FUTUR).subscribe(async () => {
    closeAllPrompts();
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_FUTUR_LINK_1).subscribe(async () => {
    boiteDeDialogue("src/betOnFuturLink1.html");
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_FUTUR_LINK_1).subscribe(async () => {
    closeAllPrompts();
    //closeAllPrompts();;
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_FUTUR_LINK_2).subscribe(async () => {
    currentPopup = await WA.ui.modal.openModal({
        title: 'testament1',// mandatory, title of the iframe modal.
        src: "https://www.youtube.com/embed/lUwhcTyrV1E?si=lWIb_M2-V8lugSMZ", // mandatory, url of the iframe modal.
        position: "center",
        allow: null,
        allowApi: true,
    })
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_FUTUR_LINK_2).subscribe(async () => {
    await currentPopup.close()
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_FUTUR_LINK_3).subscribe(async () => {
    currentPopup = await WA.ui.modal.openModal({
        title: 'testament2',// mandatory, title of the iframe modal.
        src: "https://www.youtube.com/embed/e5B5YUTsPqs?si=nwIcxbNQ5dHat8Sc", // mandatory, url of the iframe modal.
        position: "center",
        allow: null,
        allowApi: true,
    })
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_FUTUR_LINK_3).subscribe(async () => {
    await currentPopup.close()
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.BET_ON_FUTUR_LINK_4).subscribe(async () => {
    currentPopup = await WA.ui.modal.openModal({
        title: 'portrait',// mandatory, title of the iframe modal.
        src: "https://www.youtube.com/embed/AG5aU_I34EQ?si=MN1DQfnKunkBjW6l", // mandatory, url of the iframe modal.
        position: "center",
        allow: null,
        allowApi: true,
    })
})

WA.room.area.onLeave(AREA.FLOOR_LAYER.BET_ON_FUTUR_LINK_4).subscribe(async () => {
    await currentPopup.close()
})

/**
 * 
 * @param page le chemin relatif de la page à charger
 * @param h    la hauteur de la page en css (par defaut la taille pour une boite de dialogue classique)
 * @param w    la largeur de la page en css (par defaut la taille pour une boite de dialogue classique)
 * 
 * @return     une boite de dialogue s'ouvrant en bas au centre de la page parent
 */
async function boiteDeDialogue(page:string, h:string = "20vh", w:string = "75vw"):Promise<void> {
    //let document = await templateAvecScript("src/supportRH.js");
    await WA.ui.website.open({
        url             : page,
        position: {
            vertical    : "bottom",
            horizontal  : "middle",
        },
        size: {
            height      : h,
            width       : w,
        },
        margin: {
            bottom      : "15vh",
        },
        allowApi: true
    })
}
/**
 * suppression des cadres html de prompts (retire la "hitbox")
 */
async function closeAllPrompts():Promise<void> {
    let wss: UIWebsite[] = await WA.ui.website.getAll();
    wss.forEach(ws => {
        ws.close();
    })
}

export { currentPopup };
