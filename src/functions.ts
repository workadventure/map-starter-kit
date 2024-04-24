export function closePopup(currentPopup: any) {
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export function updatePopup(currentPopup: any, count: number) {
    if (currentPopup !== undefined) {
        currentPopup.close();
    }
    if (count > 0) {
        currentPopup = WA.ui.openPopup("timerPopup", "Remaining: " + count + " seconds", []);
    } else {
        currentPopup = WA.ui.openPopup("timerPopup", "Time's up!", []);
    }

    return currentPopup;
}
