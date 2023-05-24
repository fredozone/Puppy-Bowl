const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "FredZone99";
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
    console.log(result);
    console.table(result.data.players);
    playerContainer.innerHTML = "";
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
      info.setAttribute("id", `info-${players.id}`);
      card.appendChild(info);

      //action section
      const action = document.createElement("div");
      action.setAttribute("class", "actionCard");
      card.appendChild(action);

      //see details button
      const SeeButton = document.createElement("button");
      SeeButton.setAttribute("type", "submit");
      SeeButton.innerHTML = "See details";
      SeeButton.setAttribute("class", "button-see button-style");
      SeeButton.setAttribute("id", `see-${players.id}`);
      SeeButton.setAttribute("name", "see");
      // SeeButton.setAttribute("onclick", `fetchSinglePlayer('${players.id}');`);
      info.appendChild(SeeButton);

      // Attach form submit event listener
      SeeButton.addEventListener("click", async function (event) {
        event.preventDefault();
        const playerId = players.id;
        await fetchSinglePlayer(playerId);

        const seeButton = document.getElementById(`see-${playerId}`);
        seeButton.setAttribute("style", "visibility:hidden;");
      });

      //delete button
      const DeleteButton = document.createElement("input");
      DeleteButton.setAttribute("type", "button");
      DeleteButton.setAttribute("value", "Remove from roster");
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
    const response = await fetch(`${APIURL}players/${playerId}`);
    const result = await response.json();
    const player = result.data.player;
    const idInfo = document.getElementById(`info-${playerId}`);

    //breed
    const breed = document.createElement("p");
    breed.setAttribute("class", "breed");
    breed.innerHTML = player.breed;
    idInfo.appendChild(breed);

    //status
    const status = document.createElement("p");
    status.setAttribute("class", "breed");
    status.innerHTML = "<b>Status: </b>" + player.status;
    idInfo.appendChild(status);

    //team ID
    const teamsId = document.createElement("p");
    teamsId.setAttribute("class", "breed");
    teamsId.innerHTML = "<b>Team ID: </b>" + player.teamId;
    idInfo.appendChild(teamsId);
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(`${APIURL}players`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(playerObj),
    });

    const result = await response.json();
    console.table(result);
    await fetchAllPlayers();
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
    //form
    const form = document.createElement("form");
    form.setAttribute("id", "playerForm");
    newPlayerFormContainer.appendChild(form);

    //div group
    const divInputGrupoOne = document.createElement("div");
    divInputGrupoOne.setAttribute("class", "group-div");
    form.appendChild(divInputGrupoOne);

    const divInfo = document.createElement("div");
    divInfo.setAttribute("class", "info");
    divInputGrupoOne.appendChild(divInfo);

    //label name
    const labelName = document.createElement("label");
    labelName.setAttribute("class", "label-style");
    labelName.innerHTML = "Name";
    divInfo.appendChild(labelName);
    //input name
    const inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("id", "name");
    inputName.setAttribute("name", "name");
    inputName.setAttribute("class", "input-style");
    divInfo.appendChild(inputName);

    const divInfoTwo = document.createElement("div");
    divInfoTwo.setAttribute("class", "info");
    divInputGrupoOne.appendChild(divInfoTwo);
    //label breed
    const labelBreed = document.createElement("label");
    labelBreed.setAttribute("class", "label-style");
    labelBreed.innerHTML = "Breed";
    divInfoTwo.appendChild(labelBreed);
    //input breed
    const inputBreed = document.createElement("input");
    inputBreed.setAttribute("type", "text");
    inputBreed.setAttribute("id", "breed");
    inputBreed.setAttribute("name", "breed");
    inputBreed.setAttribute("class", "input-style");
    divInfoTwo.appendChild(inputBreed);

    //div group
    const divInputGrupoTwo = document.createElement("div");
    divInputGrupoTwo.setAttribute("class", "group-div");
    form.appendChild(divInputGrupoTwo);

    const divInfoThree = document.createElement("div");
    divInfoThree.setAttribute("class", "info");
    divInputGrupoTwo.appendChild(divInfoThree);
    //status
    //label status
    const labelStatus = document.createElement("label");
    labelStatus.setAttribute("class", "label-style");
    labelStatus.innerHTML = "Status";
    divInfoThree.appendChild(labelStatus);
    const divradio = document.createElement("div");
    divradio.setAttribute("id", "radio-section");
    divInfoThree.appendChild(divradio);
    //radio Field
    const radioField = document.createElement("input");
    radioField.setAttribute("type", "radio");
    radioField.setAttribute("id", "field");
    radioField.setAttribute("name", "status");
    radioField.setAttribute("value", "field");
    radioField.setAttribute("class", "input-style");
    divradio.appendChild(radioField);
    const labelField = document.createElement("label");
    labelField.setAttribute("class", "label-radio");
    labelField.innerHTML = "Field";
    divradio.appendChild(labelField);

    //radio Bench
    const radioBench = document.createElement("input");
    radioBench.setAttribute("type", "radio");
    radioBench.setAttribute("id", "bench");
    radioBench.setAttribute("name", "status");
    radioBench.setAttribute("value", "bench");
    radioBench.setAttribute("class", "input-style");
    divradio.appendChild(radioBench);
    const labelBench = document.createElement("label");
    labelBench.setAttribute("class", "label-radio");
    labelBench.innerHTML = "Bench";
    divradio.appendChild(labelBench);

    const divInfoFour = document.createElement("div");
    divInfoFour.setAttribute("class", "info");
    divInputGrupoTwo.appendChild(divInfoFour);

    //div group
    const divInputGrupoThree = document.createElement("div");
    divInputGrupoThree.setAttribute("class", "group-div");
    form.appendChild(divInputGrupoThree);

    //add buttom
    const SaveButton = document.createElement("button");
    SaveButton.setAttribute("type", "submit");
    SaveButton.innerHTML = "Add Player";
    SaveButton.setAttribute("id", "save");
    SaveButton.setAttribute("class", "button-Save button-style");
    SaveButton.setAttribute("name", "save");
    // SaveButton.setAttribute("onclick", `addNewPlayer()`);
    divInputGrupoThree.appendChild(SaveButton);

    // Attach form submit event listener
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const breed = document.getElementById("breed").value;
      const team = 437;
      const statusInputs = document.getElementsByName("status");
      let status = "";
      for (const input of statusInputs) {
        if (input.checked) {
          status = input.value;
        }
      }

      const playerObj = {
        name: name,
        breed: breed,
        status: status,
        teamId: team,
      };

      await addNewPlayer(playerObj);
    });
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
