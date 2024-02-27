import { AREA } from "../constantes"

// 1) Par défaut tout est fermé
// 2) Tout est fermé sauf porte 2
// 3) Tout est fermé sauf porte 2 et 3...
// 4) Tout est ouvert (calque collisions)

WA.room.area.onEnter(AREA.FLOOR_LAYER.VIDEO_AGENCY).subscribe(() => {
    if ((WA.player.state.authorizedRooms as number[]).includes(1) 
    && !(WA.player.state.authorizedRooms as number[]).includes(2)) {
        WA.player.state.saveVariable("authorizedRooms", [1, 2])
        WA.room.hideLayer(AREA.DOORS_LAYER.ALL_DOORS_CLOSED)
        WA.room.showLayer(AREA.DOORS_LAYER.DOOR_CAREER_AREA)
    }
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.CAREER_AREA).subscribe(() => {

    if ((WA.player.state.authorizedRooms as number[]).includes(1)
    && (WA.player.state.authorizedRooms as number[]).includes(2)
    && !(WA.player.state.authorizedRooms as number[]).includes(3)) {
        (WA.player.state.authorizedRooms as number[]).push(3)
        WA.room.hideLayer(AREA.DOORS_LAYER.DOOR_CAREER_AREA)
        WA.room.showLayer(AREA.DOORS_LAYER.DOOR_AGENCY_AREA)
    }
})

WA.room.area.onEnter(AREA.FLOOR_LAYER.AGENCY_AREA).subscribe(async () => {

    if ((WA.player.state.authorizedRooms as number[]).includes(1)
    && (WA.player.state.authorizedRooms as number[]).includes(2)
    && (WA.player.state.authorizedRooms as number[]).includes(3)
    && !(WA.player.state.authorizedRooms as number[]).includes(4)) {
        (WA.player.state.authorizedRooms as number[]).push(4)
        WA.room.hideLayer(AREA.DOORS_LAYER.DOOR_AGENCY_AREA)
        WA.room.showLayer(AREA.DOORS_LAYER.ALL_DOORS_OPENED)
    }
})