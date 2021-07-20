/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

let currentPopup: any = undefined;
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

WA.onEnterZone('clock', () => {
    currentPopup =  WA.openPopup("clockPopup","It's " + time,[]);
})

WA.onLeaveZone('clock', closePopUp)

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
