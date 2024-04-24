/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log("Script started successfully");
let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    console.log("Scripting API ready");
    console.log("Player tags: ", WA.player.tags);

    WA.room.area.onEnter("areaPopup").subscribe(async () => {
      currentPopup = await WA.ui.website.open({
        url: "./src/popupComposant.html",
        position: {
          vertical: "bottom",
          horizontal: "left",
        },
        size: {
          height: "150px",
          width: "35%",
        },
      });
    });

    WA.room.area.onLeave("areaPopup").subscribe(() => {
      currentPopup.close();
    });

  })
  .catch((e) => console.error(e));

export {};
