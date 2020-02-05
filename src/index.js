document.addEventListener("DOMContentLoaded", () => {
   

    // grab all beers from the api using fetch
    fetch("http://localhost:3000/beers")
        .then(r => r.json())
        .then (beerArray => renderBeerList(beerArray))

        function renderBeerList(beerArray) {
            //iterate through beerArray
            beerArray.forEach(beer => {
                const beerList = document.querySelector("#list-group")
                // create new list element for each new beer
                const beerLi = document.createElement("li")
                // render beer list in the side bar using HTML structure provided
                beerLi.className = "list-group-item"
                beerLi.innerText = beer.name

                // add click event listener to beer side bar items to display that beer
                beerLi.addEventListener("click", () => {renderBeerDisplay(beer)})
                // append beer to the beer list
                beerList.append(beerLi)       
            })
        }

        
    function renderBeerDisplay(beer) {
        // for after deliverables, add default beer image from beerArray[0]
        event.preventDefault()
        // grab div id beer detail
        const beerContainer = document.querySelector("#beer-detail")
        // make GET request/fetch to http://localhost:3000/beers/:id
        // use template literal to interpolate beer id
        fetch(`http://localhost:3000/beers/${beer.id}`)
        .then (r => r.json())
        .then (beerData => {
            // display single beer details
            // use this HTML structure
            beerContainer.innerHTML =
                `<h1>${beer.name}</h1>
                    <img src="${beer.image_url}">
                    <h3>${beer.tagline}</h3>
                    <textarea>${beer.description}</textarea>
                    <button id="edit-beer" class="btn btn-info">
                    Save
                    </button>`
                    // add a const to grab the submit button
                    const saveButton = document.querySelector("#edit-beer")
                    // add submit event listener for button
                    saveButton.addEventListener("click", () => {editBeerDescription(beer)})
        })
    }

    // edit beer description details
    
    function editBeerDescription (beer) {
        console.log("gonna edit this beer")
        event.preventDefault()
        // create const for text area to grab input from
        const textArea = document.querySelector("textarea")
        let updatedInfo = {description: textArea.value}
        
        // make a fetch patch request using template literal of beer id
        fetch(`http://localhost:3000/beers/${beer.id}`, {
            method: "PATCH",
            // use this for headers:   
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            // use this for body: {description: "your new description"}
            // gather input to save 
            body: JSON.stringify(updatedInfo)
        })
        .then (r => r.json())
        // save to the DOM
        // only persisting when refreshed- running out to time to fix!!!
        .then (newDescription => {
            newDescription = beer.description})
    }



        
    
})