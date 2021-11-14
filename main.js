const vasya = {
    name: "Vasiliy",
    hp: 88,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon:["Vodka","Seledka"],
    attack: function () { return console.log(`${this.name} Fight...`)},
    fClass:"player1"


}
const petr = {
    name: "Petbka",
    hp: 88,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon:["Vodka","Seledka"],
    attack: function () { return console.log(`${this.name} Fight...`)},
    fClass:"player1"
}
const MamitoAleksandrovna = {
    name: "mamamkaTvoya",
    hp: 88,
    img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
    weapon:["Vodka","Seledka"],
    attack: function () { return console.log(`${this.name} Fight...`)},
    fClass:"player2"

}

/*const $player1 = document.createElement('div')
$player1.classList.add("player1")*/
const $createPlayer = (player) => {

    const arenas =document.querySelector('div.arenas')


    const $player1 =document.createElement('div')
    $player1.classList.add(player.fClass)
    arenas.appendChild($player1)
    //
    const progressbar =document.createElement('div')
    progressbar.classList.add("progressbar")
    $player1.appendChild(progressbar)

    const life= document.createElement('div')
    life.classList.add(player.hp)
    progressbar.appendChild(life)

    const name= document.createElement('div')
    name.classList.add(player.name)
    progressbar.appendChild(name)
    name.innerText = player.name
    //
    const character= document.createElement('div')
    character.classList.add("character")
    $player1.appendChild(character)

    const img= document.createElement('img')
    img.classList.add("img")
    character.appendChild(img)
    img.src= player.img
}

$createPlayer(petr)
//$createPlayer(vasya)


////////////////helpers
const onClickF = () => {
     $createPlayer(MamitoAleksandrovna)
}
