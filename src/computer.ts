import { ITiledMapTileLayer } from "@workadventure/tiled-map-type-guard/dist/ITiledMapTileLayer";
import { getLayersMap } from "@workadventure/scripting-api-extra";
import { closePopup } from './functions';
import { current_ticket } from './main';

const layers = getLayersMap();

let popup;
let popupContent = '';

export function updateStepArea() {
    if(popup){
        closePopup(popup);
    }

    popupContent = '"' + current_ticket.description + '"' + '\nComposants : ' + current_ticket.submitted_count + '/'  + current_ticket.components.length;
    popup = WA.ui.openPopup('computerActionPopup', popupContent, []);
}
