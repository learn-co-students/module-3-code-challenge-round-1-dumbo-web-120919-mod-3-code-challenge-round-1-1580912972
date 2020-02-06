/** intial render **/
    fetch (`http://localhost:3000/beers`)
    .then (r => r.json())
    .then (beers => renderBeers(beers))

/** Getting beer name for side bar */
function renderBeers(beers){
    let beerList = document.querySelector('#list-group')
    
    
    beers.forEach(beer => {
        let beerLi = document.createElement('li')
        beerLi.className = 'list-group-item'
        beerLi.innerHTML= beer.name

        beerList.append(beerLi)

        beerLi.addEventListener('click', () => {
             //when clicking on beer name, render one beer details
            let beerDetails = document.querySelector('#beer-detail')
            beerDetails.innerHTML = `
            <h1>${beer.name}</h1>
            <img src=${beer.image_url}>
            <h3>${beer.tagline}</h3>
            <textarea id='description'>${beer.description}</textarea>
            <button type='submit' id="edit-beer" class="btn btn-info">
                Save
            </button>
            `
            let button = beerDetails.querySelector("button")

            button.addEventListener('click', () => {
                let updatedDesc = beerDetails.querySelector('#description').value
                fetch(`http://localhost:3000/beers/${beer.id}`,{
                    method: "PATCH",
                    helpers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    },
                    body: JSON.stringify({description: updatedDesc})
                })
                .then(r => r.json())
                .then(beer.description = updatedDesc); 

            })

                
        })

    })
    
}


