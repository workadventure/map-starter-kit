import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import game_data from "../game_data/game_data.json";
import {
  addComponent,
  closePopup,
  getTickets,
  startGame,
  setTimerforGame,
  setScoreforGame,
  gameStarted, setPlayerNameforGame,
} from './functions';
import { getItem } from "./inventory";

console.log("Script started successfully");

let currentPopup: any = undefined;
let changeDifficultyLevelMessage: any = undefined;
let startGameMessage: any = undefined;
let level: number = 1;
let game_tickets: any[] = [];
let current_ticket_id = 0;
let dropItemMessage: any = undefined;

export let current_ticket = null;

export const getNextTicket = () => {
  current_ticket_id++
  current_ticket = game_tickets[current_ticket_id];
}

async function showPopup(
  title: string,
  description: string,
  image: string
) {
  currentPopup = await WA.ui.website.open({
    url: `./src/componantsPopup.html?title=${title}&description=${description}&image=${image}`,
    position: {
      vertical: "bottom",
      horizontal: "left",
    },
    size: {
      height: "260px",
      width: "20%",
    },
    allowApi: true,
  });
}

const items = [
  "above/alim",
  "above/cg",
  "above/cm",
  "above/hdd",
  "above/cpu",
  "above/ram",
  "above/ssd",
  "above/ven",
];

const activateAreas = () => {
  items.forEach((item) => {
    getItem(item);
  });

  WA.room.area.onEnter("processeurPopup").subscribe(() => {
    showPopup(
      "Processeur",
      "Element central de votre ordinateur, responsable de l'execution des programmes et de la gestion des ressources de votre ordinateur.",
      "cpu"
    );
  });

  WA.room.area.onEnter("carteMerePopup").subscribe(() => {
    showPopup(
      "Carte mère",
      "Elément central de votre ordinateur, responsable de la communication entre les différents composants de votre ordinateur.",
      "motherboard"
    );
  });

  WA.room.area.onEnter("ramPopup").subscribe(() => {
    showPopup(
      "Mémoire vive",
      "Permet de stocker temporairement les données de vos programmes en cours d'execution.",
      "ram"
    );
  });

  WA.room.area.onEnter("carteGraphiquePopup").subscribe(() => {
    showPopup(
      "Carte graphique",
      "Permet de traiter les informations graphiques de votre ordinateur.",
      "graphics card"
    );
  });

  WA.room.area.onEnter("ssdPopup").subscribe(() => {
    showPopup(
      "SSD",
      "Permet de stocker de manière permanente vos données et programmes.",
      "ssd"
    );
  });

  WA.room.area.onEnter("disqueDurPopup").subscribe(() => {
    showPopup(
      "Disque dur",
      "Permet de stocker de manière permanente vos données et programmes.",
      "hard drive"
    );
  });

  WA.room.area.onEnter("ventiradPopup").subscribe(() => {
    showPopup(
      "Ventirad",
      "Permet de refroidir votre processeur pour éviter la surchauffe.",
      "ventirad"
    );
  });

  WA.room.area.onEnter("alimentationPopup").subscribe(() => {
    showPopup(
      "Alimentation",
      "Permet d'alimenter votre ordinateur en électricité.",
      "power supply"
    );
  });

  WA.room.area.onLeave("processeurPopup").subscribe(() => {
    closePopup(currentPopup);
  });

  WA.room.area.onLeave("carteMerePopup").subscribe(() => {
    closePopup(currentPopup);
  });

  WA.room.area.onLeave("ramPopup").subscribe(() => {
    closePopup(currentPopup);
  });

  WA.room.area.onLeave("carteGraphiquePopup").subscribe(() => {
    closePopup(currentPopup);
  });

  WA.room.area.onLeave("ssdPopup").subscribe(() => {
    closePopup(currentPopup);
  });

  WA.room.area.onLeave("disqueDurPopup").subscribe(() => {
    closePopup(currentPopup);
  });

  WA.room.area.onLeave("ventiradPopup").subscribe(() => {
    closePopup(currentPopup);
  });

  WA.room.area.onLeave("alimentationPopup").subscribe(() => {
    closePopup(currentPopup);
  });


  WA.room.area.onEnter("computer_action").subscribe(() => {
    dropItemMessage = WA.ui.displayActionMessage({
      message: "Appuyez sur 'Espace' pour ajouter le composant à l'ordinateur",
      callback: () => {
        if(WA.player.item != null){
          addComponent(WA.player.item);
        }
      },
    });
  });
  WA.room.area.onLeave("computer_action").subscribe(() => {
    dropItemMessage.remove();
  });
}

// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    console.log("Scripting API ready");
    console.log("Player tags: ", WA.player.tags);
    console.log("Player name: ", WA.player.name);
    console.log("Player ID: ", WA.player.id);
    console.log("Player language: ", WA.player.language);

    setPlayerNameforGame(WA.player.name);

    game_tickets = getTickets(game_data, level);

    WA.room.area.onEnter("changeDifficulty").subscribe(() => {
      currentPopup = WA.ui.openPopup(
        "showDifficultyPopup",
        "Niveau de difficulté : " + level,
        []
      );

      changeDifficultyLevelMessage = WA.ui.displayActionMessage({
        message: "Appuyez sur 'Espace' pour changer le niveau de difficulté",
        callback: () => {
          level = (level % game_data.difficulties.length) + 1;
          closePopup(currentPopup);
          currentPopup = WA.ui.openPopup(
            "showDifficultyPopup",
            "Niveau de difficulté : " + level,
            []
          );
          game_tickets = getTickets(game_data, level);
        },
      });
    });
    WA.room.area.onLeave("changeDifficulty").subscribe(() => {
      closePopup(currentPopup);
      changeDifficultyLevelMessage.remove();
    });

    WA.room.area.onEnter("startGame").subscribe(() => {
      startGameMessage = WA.ui.displayActionMessage({
        message: "Appuyez sur 'Espace' pour démarrer la partie",
        callback: () => {
          current_ticket = game_tickets[0];
          activateAreas();
          startGame();
          setTimerforGame(60);
          setScoreforGame(0);
          gameStarted(game_tickets.length);
        },
      });
    });
    WA.room.area.onLeave("startGame").subscribe(() => {
      startGameMessage.remove();
    });

    let podiumWebsite: any;
    let enterCounter = 0;

    WA.room.onEnterLayer("podium").subscribe(async () => {
      enterCounter++;
      console.log("Entered podium layer", enterCounter, "times");
      podiumWebsite = await WA.ui.website.open({
        url: "./src/podium.html",
        position: {
          vertical: "top",
          horizontal: "middle",
        },
        size: {
          height: "100vh",
          width: "70vw",
        },
        margin: {
          top: "5vh",
        },
        allowApi: true,
      });
    });

    WA.room.onLeaveLayer("podium").subscribe(() => {
      podiumWebsite.close();
    });

    bootstrapExtra()
      .then(() => {
        console.log("Scripting API Extra ready");
      })
      .catch((e) => console.error(e));
  })
  .catch((e) => console.error(e));

export {};
