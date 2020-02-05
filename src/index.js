// -- As a user, when the page loads, I should see a list of beer names retrieved from an API on the left hand side of the screen.

// -- As a user, when I click a beer name, the application should reveal more information about that particular beer.

// -- As a user, when looking at the details of a beer, I can edit the current description of a beer. Clicking the 'Save' button will save any changes added to the description in the database
const beerSideBar = document.querySelector(`#list-group`)
const beerDetailContainer = document.querySelector("#beer-detail")


fetch(`http://localhost:3000/beers`)
.then(res => res.json())
.then(beers => {
    handleBeerClick(beers[0])
    // renderOneBeer()
    renderAllBeers(beers)
})

function renderAllBeers(beers){
    beers.forEach(renderOneBeer)
}

function renderOneBeer(beer){
    console.log(beer.id)
    const beerLi = document.createElement("li")
    beerLi.className = "list-group-item"
    beerLi.innerText = beer.name
    
    beerSideBar.append(beerLi)
    
    beerLi.addEventListener('click' , () => handleBeerClick(beer))
}

function handleBeerClick(beer) {
    
    beerDetailContainer.innerHTML = 
    `
    <h1>${beer.name}</h1>
<img src="${beer.image_url}">
<h3>${beer.tagline}</h3>
<textarea class= "beerText">${beer.description}</textarea>
<button id="edit-beer" class="btn btn-info">
Save
</button>
`
// debugger
// const data = {
    //     description = event.target.image
    // }
    const editBeerBtn = document.querySelector("#edit-beer")
    editBeerBtn.addEventListener('click', () => handleEditSubmit(beer))
    
}
function handleEditSubmit(beer){
    event.preventDefault()
    let inputArea = beerDetailContainer.querySelector(".beerText").value
    const PATCH_URL = `http://localhost:3000/beers/${beer.id}`
    // console.log(beer.id)
    // console.log(inputArea)
    
    // debugger
    let data = {
        description: inputArea
    }
    console.log(data)
    const config = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }
    
    fetch(PATCH_URL, config)
    .then(res => res.json())
    .then(handleBeerClick)
}
