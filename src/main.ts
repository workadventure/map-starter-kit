import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import game_data from '../game_data/game_data.json';
import { addComponent, closePopup, getTickets, updatePopup } from './functions';
import { getItem } from './inventory';

console.log('Script started successfully');

let currentPopup: any = undefined;
let changeDifficultyLevelMessage: any = undefined;
let game_tickets: any[] = [];
let startTime = Date.now();
let level: number = 1;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    const items = ['above/processeur', 'above/carteMere', 'above/ram', 'above/carteGraphique', 'above/ssd', 'above/disqueDur', 'above/ventirad', 'above/alimentation'];

    items.forEach((item) => {
        getItem(item);
    });

    game_tickets = getTickets(game_data, level)

    WA.room.area.onEnter('changeDifficulty').subscribe(() => {
        currentPopup = WA.ui.openPopup("showDifficultyPopup", "Niveau de difficulté : " + level, []);

        changeDifficultyLevelMessage = WA.ui.displayActionMessage({
            message: "Appuyez sur 'Espace' pour changer le niveau de difficulté",
            callback: () => {
                level = (level % game_data.difficulties.length)+1
                closePopup( currentPopup )
                currentPopup = WA.ui.openPopup("showDifficultyPopup", "Niveau de difficulté : " + level, []);
                game_tickets = getTickets(game_data, level)
            }
        });
    });
    WA.room.area.onLeave('changeDifficulty').subscribe(() => {
        closePopup( currentPopup )
        changeDifficultyLevelMessage.remove()
    });

    WA.room.area.onEnter('add_component').subscribe(() => {
        addComponent(game_tickets[0], 'ram')
    });

    WA.room.area.onEnter('changeDifficulty').subscribe(() => {
        //Démarrer la partie
    })

    WA.room.area.onLeave('clock').subscribe(() => closePopup(currentPopup));

    WA.room.area.onEnter('timer').subscribe(() => {
        let count = 60;
        currentPopup = updatePopup(currentPopup, count);
        const timer = setInterval(() => {
            count--;
            currentPopup = updatePopup(currentPopup, count);
            if (count <= 0) {
                clearInterval(timer);
            }
        }, 1000);
    });

    WA.room.area.onLeave('timer').subscribe(() => closePopup(currentPopup));

    let noteWebsite: any;

    WA.room.onEnterLayer("visibleNote").subscribe(async () => {
        console.log("Entering visibleNote layer");

        noteWebsite = await WA.ui.website.open({
            url: "./src/note.html",
            position: {
                vertical: "top",
                horizontal: "middle",
            },
            size: {
                height: "30vh",
                width: "50vw",
            },
            margin: {
                top: "10vh",
            },
            allowApi: true,
        });

    });

    WA.room.onLeaveLayer("visibleNote").subscribe(() => {
        noteWebsite.close();
    });

    let podiumWebsite: any;

    let enterCounter = 0;

    WA.room.onEnterLayer("podium").subscribe(async () => {
        enterCounter++;
        console.log('Entered podium layer', enterCounter, 'times');
        podiumWebsite = await WA.ui.website.open({
            url: "./src/podium.html",
            position: {
                vertical: "top",
                horizontal: "middle",
            },
            size: {
                height: "100vh",
                width: "70vw",
            },
            margin: {
                top: "5vh",
            },
            allowApi: true,
        });
    })

    WA.room.onLeaveLayer("podium").subscribe(() => {
        podiumWebsite.close();
    });

    setTimeout(() => {
        let elapsedTime = Date.now() - startTime;
        elapsedTime = elapsedTime / 1000;

        if (enterCounter > 5) {
            let welcomePopup = WA.ui.openPopup("resultPopup", "Win, " + WA.player.name + ", you are the best! Your score: " + enterCounter + ", Time taken: " + elapsedTime + " seconds", []);

            setTimeout(() => {
                welcomePopup.close();
            }, 10000);
        }

        else {
            let welcomePopup = WA.ui.openPopup("resultPopup", "Lose, " + WA.player.name + ", you are the worst! Your score: " + enterCounter + ", Time taken: " + elapsedTime + " seconds", []);

            setTimeout(() => {
                welcomePopup.close();
            }, 10000);
        }
    }, 10000);

    console.log('Player name: ', WA.player.name);
    console.log('Player ID: ', WA.player.id);
    console.log('Player language: ', WA.player.language);

    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
