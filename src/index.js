// const beerList = document.querySelector("#list-group")

    fetch("http://localhost:3000/beers")
        .then(r => r.json())
        .then(beersArray => {
            // console.log(beersArray)
            renderAllBeers(beersArray)
        })


function renderAllBeers(beersArray) {
    let beerLi = document.querySelector(".list-group")
    let beerL = document.createElement("li")
    beerL.className = "list-group-item"

    beersArray.forEach(renderOneBeer)

}



function renderOneBeer(beerObj) {
    let beerLi = document.querySelector(".list-group")
    let beerL = document.createElement("li")
    beerL.className = "list-group-item"

    beerL.innerHTML = 
    `
    ${beerObj.name}
    `
    beerLi.append(beerL)  

        
    beerLi.addEventListener("click", (beersObj) => {
            // console.log(e.target)
            let beerInfo = document.querySelector("#beer-detail")

            beerInfo.innerHTML =
            `
                <h1>${beerObj.name}</h1>
                    <img src="${beerObj.image_url}">
                    <h3>${beerObj.tagline}</h3>
                    <textarea>${beerObj.description}</textarea>
                    <button id="edit-beer" class="btn btn-info">
                        Save
                    </button>
            `
    }) 
}


