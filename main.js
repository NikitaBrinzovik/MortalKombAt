// export const $arenas = document.querySelector('.arenas')
// export const $chat = document.querySelector('.chat')
// export const $randomButton = document.querySelector('.button')
// export const $controlForm = document.querySelector('.control')
//
// $arenas.appendChild(createPlayer(player1))
// $arenas.appendChild(createPlayer(player2))

import Game from "./classes/GAME.js";

const game = new Game();
// game.startBattle(player1, player2)

game.start()
