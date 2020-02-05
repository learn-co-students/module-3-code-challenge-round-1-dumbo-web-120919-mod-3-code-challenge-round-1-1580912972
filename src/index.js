// -- As a user, when the page loads, I should see a list of beer names retrieved from an API on the left hand side of the screen.
console.log("ii workd")

// when page loads
fetch('http://localhost:3000/beers')
.then(r => r.json())
.then(beers => renderBeers(beers))

function renderBeers(beers){
  beers.forEach(renderOneBeer)
}
// render beers to sidebar
function renderOneBeer(beers){
  const beerUl = document.querySelector('#list-group')
  const beerLi = document.createElement('li')
  beerLi.className = 'list-group-item'
  beerLi.innerText = beers.name 
  beerLi.addEventListener("click",() => showSingleBeer(beers))
  // when a beer in the sidebar is clicked...
  beerUl.append(beerLi)
// slep em on the dom
}
// -- As a user, when I click a beer name, the application should reveal XXXXX
// more information about that particular beer.



function showSingleBeer(beers){
  const singleBeerDiv = document.querySelector("#beer-detail")
  const singleBeerDeets = document.createElement('div')
  singleBeerDeets.innerHTML = 
  `<h1>${beers.name}</h1>
  <img src="${beers.image_url}">
  <h3>${beers.tagline}</h3>
  <textarea>${beers.description}</textarea>
  <button id="edit-beer" class="btn btn-info">
    Save
  </button>`
  singleBeerDiv.append(singleBeerDeets)
  // show its deets on the dom.

  const updateButt = singleBeerDeets.querySelector('button[id="edit-beer"]')
  updateButt.addEventListener('click',(e) => updateBeer(e))
  // when the save button is clicked
                          // to get the single beer to show up and have no more come when clicked, 
                          // I thought I could either reset the page or get the id from each beer.
}

function updateBeer(e){
  e.preventDefault()
  console.log("you pressed me")
      // singleBeerDeets.closest("div textarea") 

  const updateDesc = {
    description: event.target["description"].value
    // find the target and see if there's a better way
  }
  // update the description
  fetch('http://localhost:3000/beers/:id',{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(updateDesc)
  })
  .then(r => r.json())
  .then(newDesc => {
    // somewhere over here I need to be able to append the new description with my beer.
    // how can he slap?
  })
}
// my button works for this one! but my update doesnt :( 

// I just realized that I need to grab the parent element of the text box so I can 
// properly update with the user input. Value comes up undefined because there isn't any text box attached to my 
// button.


// -- As a user, when looking at the details of a beer, I can edit the current description of a beer. 
// Clicking the 'Save' button will save any changes added to the description in the database

