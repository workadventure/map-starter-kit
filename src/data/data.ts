import { AREA } from "../constantes"

WA.room.area.onEnter(AREA.FLOOR_LAYER.VIDEO_AGENCY).subscribe(() => {

    let modalOpenTime:number = Date.now();

    WA.ui.modal.openModal({
        title: 'agencyVideo',// mandatory, title of the iframe modal.
        src: "https://www.youtube.com/embed/1OnivPs6c7I?si=fcM3eA5jiw5vQ6Us",
        position: "center",
        allow: null,
        allowApi: false,
    }, () => {
        WA.player.moveTo(695, 1255, 10); //onClose modal move player to specified position on map
        const modalCloseTime:number = Date.now();
        const modalTrackTimer:number = (modalCloseTime - modalOpenTime)/1000;
        WA.player.state.saveVariable("videoAgencyData", [modalTrackTimer])
        console.log("videoAgency modal open for : " + modalTrackTimer + " seconds")
    })
})