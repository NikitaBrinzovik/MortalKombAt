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
const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};
const $arenas = document.querySelector('.arenas')
const $randomButton = document.querySelector('.button')
const $controlForm = document.querySelector('.control')
const $chat = document.querySelector('.chat')
const HIT = {
    head: 80,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];
let time = new Date()
let text


$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))
$controlForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const playerHitPoints = playerAttack()
    const enemyHitPoint = enemyAttack()

    changeHPlayers(playerHitPoints, enemyHitPoint)
    showResult()

})


const mountainWinnerName = (winnerName, loserName) => {
    generateLogs("end", winnerName, loserName)
    $arenas.appendChild(winner(winnerName))
}

const getRandomNumber = (num) => Math.ceil(Math.random() * num)

const getIIPoints = () => ATTACK[getRandomNumber(3) - 1]

const commentInChat = (logType) => `<p>${logType}</p>`

const createComment = (text) => $chat.insertAdjacentHTML('afterbegin', commentInChat(text))

function playerAttack() {
    const attack = {}
    for (let itemss of $controlForm) {
        if (itemss.checked && itemss.name === 'hit') {
            attack.value = getRandomNumber(HIT[itemss.value])
            attack.hit = itemss.value
        }

        if (itemss.checked && itemss.name === 'defence') {
            attack.defence = itemss.value
        }

        itemss.checked = false
    }

    return attack

}

function enemyAttack() {
    const hit = getIIPoints()
    const defence = getIIPoints()

    return {
        value: getRandomNumber(HIT[hit]),
        hit,
        defence,
    }
}

function startBattle(player1, player2, time) {
    generateLogs('start', player1.name, player2.name, time)
}

function generateLogs(type, player1, player2, time) {
    switch (type) {
        case "start" :
            text = logs[type]
                .replace('[time]', time)
                .replace('[player1]', player1)
                .replace('[player2]', player2)
            return createComment(text);
        case "end" :
            text = logs[type][getRandomNumber(3) - 1]
                .replace('[playerWins]', player1)
                .replace('[playerLose]', player2)
            return createComment(text);
        case 'defence':
            text = logs[type][getRandomNumber(8) - 1]
                .replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name)
            return createComment(text);
        default:
            text = logs[type][getRandomNumber(18) - 1]
                .replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name)
            return createComment(text);
    }
}

function showResult() {
    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true
        createReloadButton()

        if (player2.hp === 0 && player1.hp !== 0) {
            return mountainWinnerName(player1.name, player2.name)
        }
        if (player1.hp === 0 && player2.hp !== 0) {
            return mountainWinnerName(player2.name, player1.name)
        }

        return mountainWinnerName()
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
    // console.table(enemy)
    // console.table(player)

    if (enemy.hit !== player.defence) {
        player1.changeHP(enemy.value)
        generateLogs('hit', player2, player1)
        // generateLogs('hit', enemy, player)
    }

    if (enemy.hit === player.defence) {
        generateLogs('defence', player2, player1)
    }

    if (player.hit !== enemy.defence) {
        player2.changeHP(player.value)
        generateLogs('hit', player1, player2,)
        // generateLogs('hit', player, enemy)
    }

    if (player.hit === enemy.defence) {
        generateLogs('defence', player1, player2,)
    }

    player1.renderHP()
    player2.renderHP()
}

function winner(name) {
    const $winnerTitle = createNewElement('div', 'winnerTitle')
    if (name) {
        $winnerTitle.innerText = name + ' ' + 'wins!'
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
    $buttonRestart.addEventListener('click', () => {
        window.location.reload()
        startBattle(player1, player2)
    })

    $restartButton.innerText = 'Restart';
}

startBattle(player1, player2, time)
