//// Step 1 - Display All Beer Names

// grab tag that list all beers
const beerUl = document.querySelector("#list-group")

// get all names
fetch("http://localhost:3000/beers")
.then(r => r.json())
.then(beerData => {
    // console.log(beerData)
    renderAllBeers(beerData)
})

function renderAllBeers(beerData) {
    beerData.forEach(renderOneBeer)
}

function renderOneBeer(beer) {
    // create li tag to store beer names
    const beerLi = document.createElement("li")
    beerLi.innerText = beer.name
    beerLi.className = "list-group-item"
    
    // append li tag to ul
    beerUl.append(beerLi)
    
    // make beerLi clickable
    beerLi.addEventListener("click", handleBeerNameClick)
    
    //// Step 2 - Display Single Beer Details
    /// When I click a beer name, the application should reveal more information about that particular beer    
    function handleBeerNameClick() {
        // grab div tag containing beer detail
        const beerDiv = document.querySelector("#beer-detail")
        beerDiv.innerHTML = `
        <h1>${ beer.name }</h1>
        <img src="${ beer.image_url }">
        <h3>${ beer.tagline }</h3>
        <textarea id="desc">${ beer.description }</textarea>
        <button id="edit-beer" class="btn btn-info">
        Save
        </button>
        `
        //// Step 3 - Edit Beer Details
        /// Clicking the 'Save' button will save any changes added to the description in the database.
        
        // grab save btn
        const saveBtn = document.querySelector(".btn")
        // handle save event
        saveBtn.addEventListener("click", handleSaveClick)
        
        function handleSaveClick(e) {
            // grab new description
            const beerDes = document.querySelector("#desc")
            // console.log(beerDes.value)
            
            const newInfo = { 
                "description": beerDes.value
            }
            
            
            fetch(`http://localhost:3000/beers/${beer.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newInfo)
            })
            .then(r => r.json())
            .then(updatedInfo => {
                console.log(updatedInfo)
                // clear textarea??
                renderOneBeer(updatedInfo)
            })
            
        }
    
    }

    
}

