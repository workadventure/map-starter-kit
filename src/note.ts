/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

const editSection = document.getElementById("editSection") as HTMLDivElement;
const displayText = document.getElementById("displayText") as HTMLDivElement;
const noteTextArea = document.getElementById("noteTextArea") as HTMLTextAreaElement;
const saveButton = document.getElementById("saveButton") as HTMLButtonElement;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');

    if (WA.player.tags.includes("admin")) {
        displayText.style.display = "none";
    noteTextArea.value = (WA.state.noteText ?? "") as string;
    saveButton.addEventListener("click", () => {
        WA.state.noteText = noteTextArea.value;
    });
    } else {
        editSection.style.display = "none";
        displayText.innerText = (WA.state.noteText ?? 'No messages left') as string;
    }

}).catch(e => console.error(e));

export {};