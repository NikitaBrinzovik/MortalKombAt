import {player1, player2} from "./store/players.js";
import {createNewElement} from "./helpers/element_creaters/createNewElement.js";
import {playerAttack} from "./helpers/action_functions/playerAttack.js";
import {enemyAttack} from "./helpers/action_functions/enemyAttck.js";
import {changeHPlayers} from "./helpers/helth_points/changeHPPlayers.js";
import {startBattle} from "./helpers/logs_and_banners/startBanner.js";
import {showResult} from "./helpers/logs_and_banners/showResult.js";


export const $arenas = document.querySelector('.arenas')
export const $chat = document.querySelector('.chat')
export const $randomButton = document.querySelector('.button')
export const $controlForm = document.querySelector('.control')

$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))


$controlForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const playerHitPoints = playerAttack()
    const enemyHitPoint = enemyAttack()

    changeHPlayers(playerHitPoints, enemyHitPoint)
    showResult()

})

export function createPlayer(playerC) {
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
startBattle(player1, player2)



export function createReloadButton() {
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

