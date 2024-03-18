// import { AREA } from "../constantes"

export function closeModalCallback(modalOpenTime: number, variableName: string, x?: number, y?: number, speed?: number) {
    const modalCloseTime: number = Date.now();
    const modalTrackTimer: number = (modalCloseTime - modalOpenTime) / 1000;
    WA.player.state.saveVariable(variableName, [modalTrackTimer])
    console.log(variableName + " modal opened for : " + modalTrackTimer + " seconds")
    // if (x && y && speed) {
        // WA.player.moveTo(x, y, speed); //onClose modal move player to specified position on map
    // } else {
        WA.ui.modal.closeModal();
    // }
}