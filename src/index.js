function getBeers() {
    fetch("http://localhost:3000/beers")
    .then(r => r.json())
    .then(beers => renderBeers(beers)) //not working
}
    


function renderBeers(beers) {
    
    beers.forEach(beer => {
        let beerUl = document.querySelector(".list-group") //not showing up on screen
        let beerLi = document.createElement("li") //not showing up on screen
        beerLi.className = "list-group-item"
        
        beerLi.innerText = beer.name
        
        beerUl.append(beerLi)
    });
}

// could not complete the rest of the deliverables due to code not working
        
        
     
