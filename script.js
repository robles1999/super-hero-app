const SUPERHERO_TOKEN = '10229784321976436'
const BASE_URL = `https://www.superheroapi.com/api.php/${SUPERHERO_TOKEN}`
const SEARCH_BASE_URL =
    `https://www.superheroapi.com/api.php/${SUPERHERO_TOKEN}/search/`


//---------------- Clear search input ---------------------
const clearSearchInput = () => {
    const clearInput = document.getElementById('search-input') // select input box
    clearInput.value = ''                                      // set input box to blank
}
//---------------- get superhero 🦸 ------------------------
const getSuperHero = (heroID) => {
    // get hero
    fetch(`${BASE_URL}/${heroID}`)
        .then(response => response.json())
        .then(json => {
            showSuperheroInfo(json)
        })
}
//---------------- superhero stats emoji ------------------------
const superheroStatsEmoji = (superpower) => {
    console.log('superpower: ' + superpower)
    const emojiIcon = {
        intelligence: "🧠",
        strength: "📶",
        speed: "🚀",
        durability: "✊",
        power: "🦾",
        combat: "⚔️"
    }
    return emojiIcon[superpower]
}
//---------------- show superhero  info  -------------------
const showSuperheroInfo = (superhero) => {
    const superheroName = `<h1>${superhero.name}</h1>`
    const superheroStats = Object.keys(superhero.powerstats).map(stat => {
        return `<p>${superheroStatsEmoji(stat)}${stat.toLocaleUpperCase()}: ${superhero.powerstats[stat]}</p>`
    })
    const imgContainer = document.getElementById('img-container')
    // inserts the `h1`, `img` and `p` tags into the DOM
    imgContainer.innerHTML = `${superheroName} <img src="${superhero.image.url}" style= "border-radius: 5px" width=200/> 
    ${superheroStats.join('')}`
}
//---------------- search for superhero -------------------
const searchForSuperHero = () => {
    const searchFor = document.getElementById('search-input').value
    fetch(`${SEARCH_BASE_URL}${searchFor}`)
        .then(response => response.json())
        .then(json => {
            const superheroID = json.results[0].id
            getSuperHero(superheroID)
        })
}
//---------------- get random superhero id number ---------
const newRandomSuperHero = () => {
    clearSearchInput()
    const numberOfHeros = 731
    return Math.floor(Math.random() * numberOfHeros) + 1
}

const searchBtn = document.getElementById('search-btn')
const imgElm = document.querySelector('#image')
const newSuperHeroBtn = document.querySelector('#newHeroBtn')

searchBtn.onclick = () => searchForSuperHero()
newSuperHeroBtn.onclick = () => getSuperHero(newRandomSuperHero())
// imgElm.onclick = () => getSuperHero(newRandomSuperHero())




