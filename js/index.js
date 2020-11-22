/******** Deliverable One ********/
//GET Request 
//On Page load, show first 50 monsters
//Show monster's name, age, description

/******** GET Fetch Request ********/
fetch("http://localhost:3000/monsters/?_limit=50&-page=1")
.then(response => response.json())
.then(monsterArray => renderAllMonsters(monsterArray))

/******** Variables ********/
const monsterContainer = document.querySelector('#monster-container')

/******** Initial Rendering ********/
function renderOneMonster(monsterObj) {
   const div = document.createElement('div')
   div.dataset.id = monsterObj.id
   div.innerHTML = `
   <h2>${monsterObj.name}</h2>
   <h4>${monsterObj.age}</h4>
   <p>${monsterObj.description}</p>
   `
   monsterContainer.append(div)
}

function renderAllMonsters(monsterArray) {
    monsterArray.forEach((monster) => {
        renderOneMonster(monster)
    })
}

/******** Deliverable Two ********/
//POST Request 
//Form to create new Monster
//Field for monster's name, age, description
//'Create Monster Button'
//When we click the button, the monster should be added to list & API

/******** Variables ********/
const monsterForm = document.querySelector('#monster-form')

/******** Event Listener ********/
monsterForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const monsterName = event.target.name.value
    const monsterAge = event.target.age.value 
    const monsterDescription = event.target.description.value 

    const newMonster = {
        name: monsterName,
        age: monsterAge ,
        description: monsterDescription 
    }

fetch('http://localhost:3000/monsters', {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newMonster),
})
.then(response => response.json())
.then(newMonsterObj => {
  renderOneMonster(newMonsterObj);
})
})

/******** Deliverable Three ********/
//GET Request
//Show button. When clicked, button should show next 50 monsters

/******** Variables ********/
const backBtn = document.querySelector('#back')
const forwardBtn = document.querySelector('#forward')

/******** Event Listeners ********/
backBtn.addEventListener('click', handleClickEvent)
forwardBtn.addEventListener('click', handleClickEvent)

/******** Event Handler ********/
let pageNumber = 1
function handleClickEvent(event) {
    if (event.target.matches('#forward')) {
        pageNumber = pageNumber + 1

    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then(response => response.json())
    .then(monsterArray => {
        monsterContainer.innerHTML = ""
        renderAllMonsters(monsterArray)
    })  
    }

    else if (event.target.matches('#back')) {
        pageNumber = pageNumber - 1

    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then(response => response.json())
    .then(monsterArray => {
        monsterContainer.innerHTML = ""
        renderAllMonsters(monsterArray)
        })  

    }

}













