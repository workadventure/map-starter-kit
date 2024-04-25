import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import game_data from "../game_data/game_data.json";
import {
  addComponent,
  closePopup,
  getTickets,
  updatePopup,
} from "./functions";
import { getItem } from "./inventory";

console.log("Script started successfully");

let currentPopup: any = undefined;
let game_tickets: any[] = [];

// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    console.log("Scripting API ready");
    console.log("Player tags: ", WA.player.tags);

    const items = [
      "above/processeur",
      "above/carteMere",
      "above/ram",
      "above/carteGraphique",
      "above/ssd",
      "above/disqueDur",
      "above/ventirad",
      "above/alimentation",
    ];

    items.forEach((item) => {
      getItem(item);
    });

    WA.room.area.onEnter("get_tickets").subscribe(() => {
      game_tickets = getTickets(game_data, 2);
    });

    WA.room.area.onEnter("add_component").subscribe(() => {
      addComponent(game_tickets[0], "ram");
    });

    WA.room.area.onEnter("timer").subscribe(() => {
      let count = 60;
      currentPopup = updatePopup(currentPopup, count);
      const timer = setInterval(() => {
        count--;
        currentPopup = updatePopup(currentPopup, count);
        if (count <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    });

    WA.room.area.onLeave("timer").subscribe(() => closePopup(currentPopup));

    let noteWebsite: any;

    WA.room.onEnterLayer("visibleNote").subscribe(async () => {
      console.log("Entering visibleNote layer");

      noteWebsite = await WA.ui.website.open({
        url: "./src/note.html",
        position: {
          vertical: "top",
          horizontal: "middle",
        },
        size: {
          height: "30vh",
          width: "50vw",
        },
        margin: {
          top: "10vh",
        },
        allowApi: true,
      });
    });

    WA.room.onLeaveLayer("visibleNote").subscribe(() => {
      noteWebsite.close();
    });

    WA.room.area.onEnter("processeurPopup").subscribe(async () => {
      showPopup("processeur", 
      "Element central de votre ordinateur, responsable de l'execution des programmes et de la gestion des ressources de votre ordinateur.");
    });

    WA.room.area.onLeave("processeurPopup").subscribe(async () => {
      closePopup(currentPopup);
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

    WA.room.setTiles([{ x: 250, y: 250, tile: "test", layer: "podium" }]);

    bootstrapExtra()
      .then(() => {
        console.log("Scripting API Extra ready");
      })
      .catch((e) => console.error(e));

    async function showPopup(title: string, description: string) {
      currentPopup = await WA.ui.website.open({
        url: `./src/componantsPopup.html?title=${title}&description=${description}`,
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
  })
  .catch((e) => console.error(e));

export {};
