// import {createNewElement} from "./createNewElement";
// import {$arenas} from "../../main";
// import {startBattle} from "../logs_and_banners/startBanner";
// import {player1, player2} from "../../store/players";
//
//
// export function createReloadButton() {
//     const $reloadWrap = createNewElement('div', 'reloadWrap');
//     const $restartButton = createNewElement('button', 'button');
//
//     $arenas.appendChild($reloadWrap)
//     $reloadWrap.appendChild($restartButton);
//
//     const $buttonRestart = document.querySelector(`.reloadWrap`, `.button`);
//     $buttonRestart.addEventListener('click', () => {
//         window.location.reload()
//         startBattle(player1, player2)
//     })
//
//     $restartButton.innerText = 'Restart';
// }