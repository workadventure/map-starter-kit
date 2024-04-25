// Fonctions basiques

/*
  Donne un numéro aléatoire entre un min et un max
 */
export function get_random_number(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

/*
  Récupère l'interval entre les tickets
 */
export const get_interval = (interval: number) => {
  // chiffre au hasard : une chance sur 50
  if(get_random_number(1, 51) == 20){
    return 15;
  }else{
    return get_random_number(25, interval);
  }
}

/*
  Trie un tableau au hasard
 */
export function shuffle_array(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/***********************************************************************************************************************/

/*
  game_data : les données du fichier game_data.json (importé dans main.ts)
  level : le numéro du niveau
 */
export const getTickets = (game_data: { components?: { short_name: string; long_name: string; }[]; difficulties: any; tickets: any; },
  level: number) => {
  let tickets: any[] = [];
  const level_object = game_data.difficulties.find((i: { level: number; }) => {
    return i.level == level
  });

  if(typeof level_object !== 'undefined'){
    // Récupération des tickets
    let unformated_tickets = game_data.tickets.filter((i: { level: number; }) => {
      return i.level <= level_object.level;
    }).map((j: { demands: any; }) => {
      return j.demands;
    });
    unformated_tickets.forEach((i: any[]) => {
      Array.prototype.push.apply(tickets, i);
    })

    // Chaque ticket ordonné au hasard
    shuffle_array(tickets)
    tickets.forEach((i) => {
      i.interval = get_interval(level_object.interval) * 1000
    })
  }

  return tickets;
}

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
        currentPopup = WA.ui.openPopup("timerPopup", "Temps restant : " + count + " secondes", []);
    } else {
        currentPopup = WA.ui.openPopup("timerPopup", "Temps écoulé", []);
    }

    return currentPopup;
}

/*
  Ajoute un composant au ticket
  ticket: le ticket concerné (objet ticket)
  component : le nom du composant à ajouter (string)
 */
export const addComponent = (ticket, component: string) => {
  ticket.submitted_count++
  let toAdd = ticket.components.find((i) => {
    return i.short_name == component && !i.submitted;
  })
  if(toAdd){
    toAdd.submitted = true;
  }

  if(ticket.components.length == ticket.submitted_count){
    checkComputerFinished(ticket);
  }
}

/*
  Vérifie si l'ordinateur est bon
 ticket: le ticket concerné (objet ticket)
 */
export const checkComputerFinished = (ticket) => {
  let componentsSubmittedGood = ticket.components.filter(i => {
    return i.submitted;
  })

  if(componentsSubmittedGood.length == ticket.components.length){
    //computerIsGood(ticket);
  }else{
    //computerIsBad(ticket);
  }
}