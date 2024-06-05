import { Quest } from "./model";

const quest1 = {
    isStarted: false,
    step: [
        {area: "tv", value: false},
        {area: "tableGame", value: false}
    ],
    isDone: false
}

const quests: Quest[] = [
    {
        id: 1,
        name: "QuestName",
        questDetail: quest1 
    },
]

export const startQuest = (questId: number) => {
    console.log(quests[questId]);
    // const quest: Quest | undefined = quests.find(q => q.id === questId);
    // const playerQuest: Quest | undefined = (WA.player.state.quests as Quest[]).find(q => q.id === questId);

    // if (quest && !playerQuest) {
    //     WA.ui.openPopup("billards", "Une quête commence !", [{
    //         label: "Let's go !",
    //         className: "primary",
    //         callback: (popup) => {
    //             popup.close();
    //         }
    //     }]);
    //     // Peut etre proposer une alerte "voulez vous commencer cette quete ?" 
    //     quest.questDetail.isStarted = true;
    //     (WA.player.state.quests as Quest[]).push(quest);
    //     // Ajouter une alerte visuelle pour confirmer que la quete a commencée
    //     console.log(WA.player.state.quests);
    // }
}

export const updateQuest = (questId: number) => {
    const playerQuest = (WA.player.state.quests as Quest[]).find(q => q.id === questId)

    if (playerQuest?.questDetail.isStarted === true && playerQuest?.questDetail.isDone === false) {
        // Est ce que on doit suivre un ordre precis ou juste valider les étapes
    }
}