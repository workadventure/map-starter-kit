import { VariableDescriptor, bootstrapExtra, getLayersMap, getVariables, findLayerBoundaries } from "@workadventure/scripting-api-extra";
import { ITiledMapTileLayer } from "@workadventure/tiled-map-type-guard/dist/ITiledMapTileLayer";
import { dropItemInComputer } from "./computer";

/**
 * On récupère les layers de la map
 */
const layers = getLayersMap();

/**
 * On créer un menu pour l'inventaire
 * Ce menu est lié à une iframe qui affiche l'inventaire
 */
const menu = WA.ui.registerMenuCommand('Inventaire', {
    key: 'inventory',
    iframe: 'http://localhost:5173/inventory.html',
    allowApi: true, 
});

/**
 * On ajoute un bouton dans la barre d'action pour ouvrir l'inventaire
 */
WA.ui.actionBar.addButton({
    id: 'inventory',
    type: 'action',
    imageSrc: 'https://cdn-icons-png.flaticon.com/512/831/831698.png',
    toolTip: 'Inventaire',
    callback: () => {
        WA.ui.getMenuCommand("inventory").then((h) => {
            menu.open();
            h.open();
        });
    }
});

/**
 * Il faut que l'item soit un Layer dans Tiled
 * Avec la propriété 'getted' à false
 * 
 * @param itemName Nom de l'item dans Tiled
 * @returns 
 */
export function getItem(itemName: string) {
    WA.room.onEnterLayer(itemName).subscribe(() => {
        console.log('entrer dans la zone')
        const triggerMessage = WA.ui.displayActionMessage({
            message: `Appuyer sur 'space' pour récupérer ${itemName.substring(6)} !`,
            callback: () => {
                WA.room.setProperty(itemName, 'getted', true);
                
                layers.then((layer) => {
                    Object.entries(layer.get(itemName) as ITiledMapTileLayer).forEach((key) => {
                        if (key[0] === 'properties') {
                            Object.values(key[1]).forEach((value) => {
                                if (value.name === 'getted' && value.value === false) {
                                    value.value = true;
                                    WA.room.hideLayer(itemName);
                                    let mySound = WA.sound.loadSound("sound/pickup.ogg");
                                    mySound.play();
                                }
                            }
                        )};
                    });
                });
            }
        });

        /* on supprime le message si on sort de la zone */
        WA.room.onLeaveLayer(itemName).subscribe(() => {
            triggerMessage.remove();
        });
    });

    /**
     * TODO: zone qui correspond au pc
     */
    dropItemInComputer('computer1Area', itemName);
}
