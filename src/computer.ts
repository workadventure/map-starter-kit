import { ITiledMapTileLayer } from "@workadventure/tiled-map-type-guard/dist/ITiledMapTileLayer";
import { VariableDescriptor, bootstrapExtra, getLayersMap, getVariables, findLayerBoundaries } from "@workadventure/scripting-api-extra";
import { closePopup } from './functions';

const layers = getLayersMap();

let popup;
let popupContent = '';

export function newStepArea(computerAreaName: string, ticket) {
    const area = WA.room.area.create({
        name: computerAreaName,
        x: 450,
        y: 500,
        width: 30,
        height: 30,
    });

    WA.room.area.onEnter(computerAreaName).subscribe(() => {
        popupContent = '"' + ticket.description + '"' + '\nComposants : 0 /'  + ticket.components.length;
        popup = WA.ui.openPopup('computer1Popup', popupContent, []);
    });

    WA.room.area.onLeave(computerAreaName).subscribe(() => {
        closePopup(popup);
    });
}

export function dropItemInComputer(computerAreaName: string, itemName: string) {
    WA.room.area.onEnter(computerAreaName).subscribe(() => {
        WA.room.setProperty(itemName, 'getted', false);

        layers.then((layer) => {
            Object.entries(layer.get(itemName) as ITiledMapTileLayer).forEach((key) => {
                if (key[0] === 'properties') {
                    Object.values(key[1]).forEach((value) => {
                        if (value.name === 'getted' && value.value === true) {
                            value.value = false;
                            WA.room.showLayer(itemName);
                            popupContent += `- ${itemName.substring(6)} \n`;
                        }
                    }
                )};
            });
        });
    });
}


