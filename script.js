const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "FredZone8";
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(`${APIURL}players`);
    const result = await response.json();
    console.table(result.data.players);

    for (const players of result.data.players) {
      //creating the card style
      const card = document.createElement("div");
      card.setAttribute("class", "card-style");
      card.setAttribute("id", players.id);
      playerContainer.appendChild(card);

      //creating the imagen div
      const imageSection = document.createElement("div");
      imageSection.setAttribute("class", "imgDiv");
      card.appendChild(imageSection);

      const imagen = document.createElement("img");
      imagen.setAttribute("class", "imagenPlayer");
      imagen.setAttribute("src", players.imageUrl);
      imageSection.appendChild(imagen);

      //creating the name div
      const name = document.createElement("div");
      name.setAttribute("class", "namePlayer");
      card.appendChild(name);

      const namePlayer = document.createElement("p");
      namePlayer.setAttribute("class", "playerName");
      namePlayer.innerHTML = `${players.name} <span class = "little-text">( ID : ${players.id} )</span>`;
      name.appendChild(namePlayer);

      //pet info
      const info = document.createElement("div");
      info.setAttribute("class", "infoPet");
      card.appendChild(info);

      //breed
      const breed = document.createElement("p");
      breed.setAttribute("class", "breed");
      breed.innerHTML = players.breed;
      info.appendChild(breed);

      //status
      const status = document.createElement("p");
      status.setAttribute("class", "breed");
      status.innerHTML = "<b>Status: </b>" + players.status;
      info.appendChild(status);
      //action section
      const action = document.createElement("div");
      action.setAttribute("class", "actionCard");
      card.appendChild(action);
      //delete button
      const DeleteButton = document.createElement("input");
      DeleteButton.setAttribute("type", "button");
      DeleteButton.setAttribute("value", "Delete");
      DeleteButton.setAttribute("class", "button-delete button-style");
      DeleteButton.setAttribute("name", "delete");
      DeleteButton.setAttribute("onclick", `removePlayer('${players.id}');`);
      action.appendChild(DeleteButton);
    }
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

const fetchSinglePlayer = async (playerId) => {
  try {
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

const addNewPlayer = async (playerObj) => {
  try {
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}players/${playerId}`, {
      method: "DELETE",
    });
    //getting the id from the card div
    const cardId = document.getElementById(playerId);
    //removing the the child from playerContainer
    playerContainer.removeChild(cardId);
    const result = await response.json();
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players.
 *
 * Then it takes that larger string of HTML and adds it to the DOM.
 *
 * It also adds event listeners to the buttons in each player card.
 *
 * The event listeners are for the "See details" and "Remove from roster" buttons.
 *
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player.
 *
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster.
 *
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
  try {
  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

init();
