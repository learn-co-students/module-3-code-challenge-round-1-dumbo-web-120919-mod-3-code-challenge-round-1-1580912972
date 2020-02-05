document.addEventListener("DOMContentLoaded", () => {
    loadPage()
})
//load in beer data and display beers
function loadPage(){
    fetch('http://localhost:3000/beers')
    .then(r => r.json())
    .then(beers => displayBeers(beers))
}
//list all beers insidebar
function displayBeers(beers){
    beers.forEach(beerObj => {
        displayOneBeer(beerObj)
    })
}
//list one beer on sidebar, add event listener to the beer
function displayOneBeer(beerObj){
    const beerLi = document.createElement('li')
    beerLi.className = "list-group-item"
    beerLi.innerText = beerObj.name
    document.querySelector(".list-group").append(beerLi)
    beerLi.addEventListener("click", () => {
        displayMainBeer(beerObj.id)
    })
}
//display main beer details after click
function displayMainBeer(beerId){
    fetch(`http://localhost:3000/beers/${beerId}`)
    .then(r => r.json())
    .then(beerObj => {
        document.querySelector("#beer-detail").innerHTML = `
        <h1>${beerObj.name}</h1>
        <img src="${beerObj.image_url}">
        <h3>${beerObj.tagline}</h3>
        <textarea>${beerObj.description}</textarea>
        <button id="edit-beer" class="btn btn-info">
            Save
        </button>
        `
        document.querySelector("#edit-beer").addEventListener("click", (event) =>{
            handleSave(event, beerObj.id)
        })
    })
}
//change description of a beer upon submit
function handleSave(event, beerId){ 
    fetch(`http://localhost:3000/beers/${beerId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({description: `${event.target.parentElement.querySelector('textarea').value}`})
    })
    .then(r => r.json())
}