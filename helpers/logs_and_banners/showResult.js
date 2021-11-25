// import {player1, player2} from "../../store/players.js";
// import {$randomButton} from "../../main.js";
// import {mountainWinnerName} from "./bannerAtTheEndOfbattle.js";
// import {createReloadButton} from "../element_creaters/createReloadButton.js";
//
// export function showResult() {
//     const {hp:myHP, name:myName}= player1
//     const {hp:enemyHP, name:enemyName}= player2
//
//     if (myHP === 0 || enemyHP === 0) {
//         $randomButton.disabled = true
//         createReloadButton()
//
//         if (enemyHP === 0 && myHP !== 0) {
//             return mountainWinnerName(myName, enemyName)
//         }
//
//         if (myHP === 0 && enemyHP !== 0) {
//             return mountainWinnerName(enemyName, myName)
//         }
//
//         return mountainWinnerName()
//     }
// }