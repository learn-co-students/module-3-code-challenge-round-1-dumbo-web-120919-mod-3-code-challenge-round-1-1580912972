
    fetch(`http://localhost:3000/beers`)
  .then(r => r.json())
  .then((beers) => {
    renderAllBeers(beers);
  });

function renderAllBeers(beerArray) {
    beerArray.forEach(renderOneBeer)
}

function renderOneBeer(beer) {
    const beerSidebar = document.querySelector('#list-group')
    const beerDetail = document.querySelector('#beer-detail')
    const beerLi = document.createElement('li')
    beerLi.className = 'list-group-item'
    beerLi.innerText = beer.name 
    beerSidebar.append(beerLi)
    beerLi.addEventListener('click', () => {
        beerDetail.innerHTML = `<h1>Beer Name: ${beer.name}</h1>
        <img src="${beer.image_url}">
        <h3>Beer Tagline: ${beer.tagline}</h3>
        <textarea id="beer-description">Beer Description: ${beer.description}</textarea>
        <button id="edit-beer" class="btn btn-info">
          Save
        </button>`
    })
    updateBeer(beer) // this isn't working properly. why?
}

function updateBeer(beer) {
    const beerDescription = document.querySelector('#beer-description')
    const beerDetail = document.querySelector('#beer-detail')
    const editBeer = document.querySelector('#edit-beer')
    beerDetail.addEventListener('submit', event => {
        event.preventDefault()
        debugger
        if (event.target.id === editBeer.id) { 
            console.log('i got clicked') // why is this not registering?
            // ADD ACTUAL CHANGE EVENT HERE


            fetch(`http://localhost:3000/beers/${beer.id}`, {
                method: 'PATCH',
                body: JSON.stringify({ 
                    description: `${beerDescription.value}` 
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(r => r.json())
        }
    })
}