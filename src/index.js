/** intial render **/
function getBeers(){
    fetch (`http://localhost:3000/beers`)
    .then (r => r.json())
    .then (beers => renderBeers(beers))
}

getBeers();
/** Getting beer name for side bar */
function renderBeers(beers){
    let beerListContainer = document.querySelector('#list-group')
    let beerUl= document.createElement('ul')
    beerUl.className = 'list-group'
    beerListContainer.append(beerUl)
    
    beers.forEach(beer => {
        let beerLi = document.createElement('li')
        beerLi.innerHTML= `<li class="list-group-item">${beer.name}</li>`
        beerUl.append(beerLi)

        beerLi.addEventListener('click', () => { //when clicking on beer name, render details
            let beerDetailsContainer = document.querySelector('#beer-detail')
            let beerInfo = document.createElement('div')
            beerInfo.innerHTML = `
            <h1>${beer.name}</h1>
            <img src=${beer.image_url}>
            <h3>${beer.tagline}</h3>
            <textarea>${beer.description}</textarea>
            <button type='submit' id="edit-beer" class="btn btn-info">
                Save
            </button>
            `
            beerDetailsContainer.append(beerInfo)

        }) 

        

        


        

    })
    
}


