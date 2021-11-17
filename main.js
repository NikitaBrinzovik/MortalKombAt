const player1 = {
    name: "Vasiliy",
    player: 1,
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ["Vodka", "Seledka"],
    attack: function () {
        return console.log(`${this.name} Fight...`)
    },
    elHP: elHP,
    changeHP: changeHP,
    renderHP: renderHP,
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
    elHP: elHP,
    changeHP: changeHP,
    renderHP: renderHP,
}

const arenas = document.querySelector('.arenas')
const $randomButton = document.querySelector('.button')
const $buttonCreater = document.querySelector('.control')
arenas.appendChild(createPlayer(player1))
arenas.appendChild(createPlayer(player2))

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

const getRandomNumber = () => Math.ceil(Math.random() * 20)

function changeHP(hitPoints) {
    this.hp -= hitPoints

    if (this.hp > 0) {
        return this.hp
    }

    return this.hp = 0
}

function elHP() {
    return document.querySelector(`.player${this.player} .life`)
}

function renderHP() {
    this.elHP().style.width = this.hp + '%'
}

function changeHPPlayers() {
    player1.changeHP(getRandomNumber())
    player2.changeHP(getRandomNumber())

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

    $restartButton.innerText = 'Restart';
    $reloadWrap.appendChild($restartButton);

    return $reloadWrap;
}

function showRestartButton() {
    $buttonCreater.appendChild(createReloadButton())
    const $buttonRestart = document.querySelector(`.reloadWrap`, '.button');
    $buttonRestart.addEventListener('click', function () {
        window.location.reload()
    })
}


$randomButton.addEventListener('click', function () {
    changeHPPlayers()


    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true
        showRestartButton()

        if (player2.hp === 0 && player1.hp !== 0) {
            return arenas.appendChild(winner(player1.name))
        }
        if (player1.hp === 0 && player2.hp !== 0) {
            return arenas.appendChild(winner(player2.name))
        }

        return arenas.appendChild(winner())
    }
})
