fetch('http://localhost:3000/beers')
      .then(res => res.json())
      .then((data) => {
           ourBeer = data
        console.log("data is", data)
        renderBeers(ourBeer)
      })


 
function renderBeers(ourBeer) {
let beerList = document.querySelector("#list-group")
ourBeer.forEach(beer =>{
let beerLi = document.createElement("li")
beerLi.innerText = beer.name
beerList.append(beerLi)

beerLi.addEventListener('click', () => {
    let beerInfo = document.querySelector("#beer-detail")
  beerInfo.innerHTML =`
  <h1>${beer.name}</h1>
<img src=${beer.image_url}>
<h3>${beer.tagline}</h3>
<textarea>${beer.description}</textarea>
<button id="edit-beer" class="btn btn-info">
  Save
</button>`

beerSubmit= document.querySelector("#edit-beer")
beerSubmit.addEventListener("submit", patchBeer)

function patchBeer(event){
event.preventDefault()
let description = e.target.description.value 
fetch(`http://localhost:3000/beers/${beer.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "description": description
      })
    })
    .then(res => res.json())
    .then((descrip => {
      e.target.description.value = description
    }))
}


})
})
}

