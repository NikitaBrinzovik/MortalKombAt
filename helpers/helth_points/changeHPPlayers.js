// import {player1, player2} from "../../store/players.js";
// import {generateLogs} from "../logs_and_banners/generateLogs.js";
//
// export function changeHPlayers(player, enemy) {
//     console.table(enemy)
//     console.table(player)
//
//     let {value:myDamage, hit:myTarget, defence:myDefence} = player
//     let {value:enemyDamage, hit:enemyTarget, defence:enemyDefence} = enemy
//
//     if (enemyTarget !== myDefence) {
//         let hpAfterHit = player1.changeHP(enemyDamage)
//         generateLogs('hit', player2, player1, enemyDamage,`[${hpAfterHit}/100]` )
//     }
//
//     if (enemyTarget === myDefence) {
//         generateLogs('defence', player2, player1)
//     }
//
//     if (myTarget !== enemyDefence) {
//         let hpAfterHit = player2.changeHP(myDamage)
//         generateLogs('hit', player1, player2, myDamage, `[${hpAfterHit}/100]`)
//     }
//
//     if (myTarget === enemyDefence) {
//         generateLogs('defence', player1, player2,)
//     }
//
//     player1.renderHP()
//     player2.renderHP()
// }