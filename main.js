const player1 = {
    name: "Vasiliy",
    player: 1,
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ["Vodka", "Seledka"],
    attack: function () {
        return console.log(`${this.name} Fight...`)
    },
    fClass: "player1"


}
const petr = {
    name: "Petbka",
    player: 2,
    hp: 88,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["Vodka", "Seledka"],
    attack: function () {
        return console.log(`${this.name} Fight...`)
    },
    fClass: "player1"
}
const  player2= {
    player: 2,
    name: "mamitoAleksandrovna",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
    weapon: ["Vodka", "Seledka"],
    attack: function () {
        return console.log(`${this.name} Fight...`)
    },
    fClass: "player2"

}

const arenas = document.querySelector('.arenas')
const  $randomButton =document.querySelector('.button')

function createMyElement(tag, className) {
    const $tag = document.createElement(tag)
    if(className){
        $tag.classList.add(className)
    }
    return $tag
}

const randomNumber = () => Math.ceil(Math.random()* 20)

function changeHP(player, helth) {
    player.hp -=randomNumber();
    if(player.hp > 0) {
        return helth.style.width = player.hp + '%'
    }
    $randomButton.disabled = true
    winner(player.name=== player1 ? player2.name  : player1.name)
    return helth.style.width = "0%";
}

const $winnerTitle = createMyElement('div', "winnerTitle")
console.log($winnerTitle)
const winner =(name)=> {
     arenas.appendChild($winnerTitle)
    return $winnerTitle.innerText = name + " wins!";
}

function createPlayer(playerC) {
//const createPlayer = ( playerC) => {

    const player1 = createMyElement("div", "player"+playerC.player)
    const progressbar = createMyElement("div", "progressbar")
    const life = createMyElement("div","life")
    const name = createMyElement("div", "name")
    const character = createMyElement("div","character")
    const img = createMyElement('img', "img")



    // .appendChild(player1)

    progressbar.appendChild(name)
    progressbar.appendChild(life)
    character.appendChild(img)
    player1.appendChild(progressbar)
    player1.appendChild(character)


    life.style.width = playerC.hp + "%"
    name.innerText = playerC.name
    img.src = playerC.img

    return player1
}


console.log(player1)
console.log(player2)



arenas.appendChild(createPlayer(player1))
arenas.appendChild(createPlayer(player2))

const $playerLife = document.querySelector('.player1 .life')
const $playerLife2 = document.querySelector('.player2 .life')
$randomButton.addEventListener('click',  () =>{
    changeHP(player1, $playerLife)
    changeHP(player2, $playerLife2)
})

////////////////helpers
const onClickF = () => {
    winner(player1)
}
