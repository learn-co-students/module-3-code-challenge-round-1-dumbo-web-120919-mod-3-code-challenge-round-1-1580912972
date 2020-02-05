document.addEventListener('DOMContentLoaded', (event) => {

/*------------DOM-ELEMENTS--------------*/

const sideBar = document.querySelector("#list-group");
const beerDetailContainer = document.querySelector("#beer-detail");


/*----------------FETCHES---------------*/

// persist updated beer description to database with a fetch

function persistBeerDescriptionUpdate (updatedDescription, beerObjId) {
   
    // return parsed fetch response to parent function for DOM updating
    return fetch(`http://localhost:3000/beers/${beerObjId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            description: updatedDescription
        })
    })
      .then(r => r.json());    
}

/*---------------RENDERERS--------------*/

// renders list of food pairings for given beer

function renderFoodPairingList (foodPairingArray) {
    // gain access to the unorder pairing list element
    const pairingList = document.querySelector("#food-pairing-list");

    // for each pairing, create a new list element and append it to the above ul element
    foodPairingArray.forEach((foodPairing) => {
        const pairingLi = document.createElement('li');
        pairingLi.textContent = foodPairing;

        pairingList.append(pairingLi);
    })
}

// renders the details for selected beer

function renderBeerDetail (beerObj) {
    beerDetailContainer.innerHTML = `
        <h1>${beerObj.name}</h1>
        <img src="${beerObj.image_url}">
        <h3>${beerObj.tagline}</h3>
        <h5>Description:</h5>
        <textarea id=description rows="5">${beerObj.description}</textarea>
        <button id="edit-beer" class="btn btn-info">
            Update Description
        </button>
        <h4>Our 🔥 HOT 🔥Featured Tip:</h4>
        <p><i>${beerObj.brewers_tips}</i></p>
        <h5>Tums rumbling for noshes? Some paring suggestions:</h5>
        <ul id="food-pairing-list"></ul>
    `
    // had some extra time so I wanted to do stuff with the other data
    renderFoodPairingList(beerObj.food_pairing);

    // gain access to save button created above
    saveButton = document.querySelector("#edit-beer");

    // when the user clicks on the save button, grab the value of the updated text area
    // and persist it to the database with given beer object's id and updated description

    saveButton.onclick = () => {
        const updatedDescription = document.querySelector("#description").value;
        const beerObjId = beerObj.id;

        // update beer object details so that it is rendered with the updated description next time it's clicked
        persistBeerDescriptionUpdate(updatedDescription, beerObjId)
          .then(beerObj.description = updatedDescription); 
        
    }
}

// renders a single beer in the sidebar with beer object

function renderSingleBeerInSideBar (beerObj) {
    const beerLi = document.createElement('li');
    beerLi.className = 'list-group-item';
    beerLi.textContent = `🍺${beerObj.name}`;

    sideBar.append(beerLi);

    // when the user clicks on the beer's name in the side bar, its details are rendered in main container
    beerLi.onclick = () => renderBeerDetail(beerObj);

}

// iterates through given beers array and renders each beer in the sidebar

function renderManyBeersInSideBar (beers) {
    beers.forEach(renderSingleBeerInSideBar);
}

// initial render
function init () {
    fetch('http://localhost:3000/beers')
      .then(r => r.json())
      .then(beers => {
          renderManyBeersInSideBar(beers)
          renderBeerDetail(beers[0]); // render first beer in list on page load
        });
}

init();


}); // end of DOM Content Loaded