    /***** DOM ELEMENTS *****/
const beerList = document.getElementById("list-group");
const beerDetailsDiv = document.getElementById("beer-detail");

let allBeers = [];

    /***** EVENT LISTENERS *****/
beerList.addEventListener("click", handleBeerClick);

    /***** EVENT HANDLERS *****/
// handler to render clicked beer's info to main body
function handleBeerClick(event) {
  if (event.target.className === "list-group-item") {
    clickedBeerLi = event.target.closest("li");
    clickedBeerId = parseInt(clickedBeerLi.id);
    clickedBeer = allBeers.find( beer => beer.id === clickedBeerId );
    
    renderBeerDetails(clickedBeer);
  };
};
// handler to edit beer description, added in render below
function handleEditBeer(event) {
  beerEditFormDescription = document.getElementById("beer-description");
  let newBeerDescription = beerEditFormDescription.value;

  editBeerObj = {
    description: newBeerDescription
  };

  patchBeerDescriptionFetch(editBeerObj);
};

    /***** FETCHES *****/
// GET fetch to retrieve all beers and render them on init
const initialFetchToRenderBeers = function() {
  fetch('http://localhost:3000/beers')
  .then( response => response.json() )
  .then( beers => {
    allBeers = beers;
    renderAllBeers(beers)
    renderBeerDetails(beers[0]); 
  })
};
// PATCH fetch to update a beer's description
const patchBeerDescriptionFetch = function(editBeerObj) {
  // has access to the beerId variable through scope
  fetch(`http://localhost:3000/beers/${beerId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(editBeerObj)
  })
  .then( response => response.json() )
  // realized I needed to add an extra line in here to render the edit appropriately-- I can explain it when we talk. It's updating the DB and showing on refresh, I know what I need to do to fix it!
  .then( updatedBeer => renderBeerDetails(updatedBeer) )
  alert("Beer successfully updated 🍺");
};

    /***** RENDER FUNCTIONS *****/
// functions to render beers to sidebar
function renderOneBeer(beer) {
  let beerLi = document.createElement("li");
  beerLi.id = beer.id;
  beerLi.className = "list-group-item";

  beerLi.innerText = beer.name;

  beerList.append(beerLi);
};
function renderAllBeers(beers) {
  clearChildren(beerList);
  beers.forEach( beer => renderOneBeer(beer) );
};
// function to render one beer's details to main body
function renderBeerDetails(beer) {
  clearChildren(beerDetailsDiv);

  beerDetailsDiv.innerHTML = `
  <h1>${beer.name}</h1>
  <img src="${beer.image_url}">
  <h3>${beer.tagline}</h3>
  <textarea id="beer-description">${beer.description}</textarea>
  <button id="edit-beer" class="btn btn-info">
    Save
  </button>
  <h4><em>First Brewed: ${beer.first_brewed}</em></h4>
  <h4>Food Pairing Recommendations</h4>
  <ul id="food-pairing-list">
  </ul>
  <h4>Brewer's Tips:</h4>
  <p>${beer.brewers_tips}</p>`

  beer.food_pairing.forEach( food => renderOneFoodPairing(food) );

  beerId = beer.id;

  let editButton = document.getElementById("edit-beer");
  editButton.addEventListener("click", handleEditBeer);
};
// *BONUS* function to render food-pairings from beer database
function renderOneFoodPairing(food) {
  foodPairingList = document.getElementById("food-pairing-list");
  foodLi = document.createElement("li")
  foodLi.innerText = food;

  foodPairingList.append(foodLi);
};

    /***** MISC. FUNCTIONS *****/
// function to clear all children of an element
function clearChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  };
};

    /***** INITIAL RUNNER FUNCTIONS *****/
// begins the application by fetching and rendering all beers to the sidebar
initialFetchToRenderBeers();
