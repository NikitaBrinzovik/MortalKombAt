const player1 = {
    name: "Vasiliy",
    player: 1,
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ["Vodka", "Seledka"],
    attack: function () {
        return console.log(`${this.name} Fight...`)
    },
    elementHP,
    changeHP,
    renderHP,
}

const player2 = {
    player: 2,
    name: "mamitoAleksandrovna",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
    weapon: ["Vodka", "Seledka"],
    attack: function () {
        return console.log(`${this.name} Fight...`)
    },
    elementHP,
    changeHP,
    renderHP,
}

const $arenas = document.querySelector('.arenas')
const $randomButton = document.querySelector('.button')
const $controlForm = document.querySelector('.control')
const HIT = {
    head: 80,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];
$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))

$controlForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const playerAttack = {}

    for (let itemss of $controlForm) {
        if (itemss.checked && itemss.name === 'hit') {

            playerAttack.value = getRandomNumber(HIT[itemss.value])
            playerAttack.hit = itemss.value

        }

        if (itemss.checked && itemss.name === 'defence') {
            playerAttack.defence = itemss.value
        }

        itemss.checked = false
    }
    playerAttack.attack = function () {
        return {
            value: this.value,
            hit: this.hit,
            defence: this.defence
        }
    }
    const playerHitPoints = playerAttack.attack()
    const enemyHitPoint = enemyAttack()
    changeHPlayers(playerHitPoints, enemyHitPoint)


    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true
        createReloadButton()

        if (player2.hp === 0 && player1.hp !== 0) {
            return $arenas.appendChild(winner(player1.name))
        }
        if (player1.hp === 0 && player2.hp !== 0) {
            return $arenas.appendChild(winner(player2.name))
        }

        return $arenas.appendChild(winner())
    }


})

function enemyAttack() {
    const hit = ATTACK[getRandomNumber(3) - 1]
    const defence = ATTACK[getRandomNumber(3) - 1]

    return {
        value: getRandomNumber(HIT[hit]),
        hit,
        defence
    }
}

function createNewElement(tag, className) {
    const $tag = document.createElement(tag)
    if (className) {
        $tag.classList.add(className)
    }
    return $tag
}

function createPlayer(playerC) {
    const player1 = createNewElement("div", "player" + playerC.player)
    const progressbar = createNewElement("div", "progressbar")
    const life = createNewElement("div", "life")
    const name = createNewElement("div", "name")
    const character = createNewElement("div", "character")
    const img = createNewElement('img', "img")

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

const getRandomNumber = (num) => Math.ceil(Math.random() * num)


function elementHP() {
    return document.querySelector(`.player${this.player} .life`)
}

function renderHP() {
    this.elementHP().style.width = this.hp + '%'
}

function changeHP(hitPoints) {
    this.hp -= hitPoints

    if (this.hp <= 0) {
        this.hp = 0
    }
}

function changeHPlayers(player, enemy) {

    console.table(enemy)
    console.table(player)


    if(enemy.hit !== player.defence){
        console.log(1)
        player1.changeHP(enemy.value)

    }
    if(player.hit !== enemy.defence){
        console.log(2)
        player2.changeHP(player.value)
    }

    player1.renderHP()
    player2.renderHP()
}

function winner(name) {
    const $winnerTitle = createNewElement('div', 'winnerTitle')
    if (name) {
        $winnerTitle.innerText = name + 'wins!'
        return $winnerTitle
    }
    $winnerTitle.innerText = 'draw'
    return $winnerTitle
}

function createReloadButton() {
    const $reloadWrap = createNewElement('div', 'reloadWrap');
    const $restartButton = createNewElement('button', 'button');

    $arenas.appendChild($reloadWrap)
    $reloadWrap.appendChild($restartButton);

    const $buttonRestart = document.querySelector(`.reloadWrap`, `.button`);
    $buttonRestart.addEventListener('click', function () {
        window.location.reload()
    })

    $restartButton.innerText = 'Restart';
}


// $randomButton.addEventListener('click', function () {
//     changeHPlayers()
//
//
//     if (player1.hp === 0 || player2.hp === 0) {
//         $randomButton.disabled = true
//         createReloadButton()
//
//         if (player2.hp === 0 && player1.hp !== 0) {
//             return $arenas.appendChild(winner(player1.name))
//         }
//         if (player1.hp === 0 && player2.hp !== 0) {
//             return $arenas.appendChild(winner(player2.name))
//         }
//
//         return $arenas.appendChild(winner())
//     }
// })
