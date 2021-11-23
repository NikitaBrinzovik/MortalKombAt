import {player1, player2} from "../../store/players.js";
import {generateLogs} from "../logs_and_banners/generateLogs.js";

export function changeHPlayers(player, enemy) {
    console.table(enemy)
    console.table(player)

    if (enemy.hit !== player.defence) {
        let hpAfterHit = player1.changeHP(enemy.value)
        console.log(hpAfterHit)
        generateLogs('hit', player2, player1, enemy.value,`[${hpAfterHit}/100]` )
    }

    if (enemy.hit === player.defence) {
        generateLogs('defence', player2, player1)
    }

    if (player.hit !== enemy.defence) {
        let hpAfterHit = player2.changeHP(player.value)
        generateLogs('hit', player1, player2, player.value, `[${hpAfterHit}/100]`)
    }

    if (player.hit === enemy.defence) {
        generateLogs('defence', player1, player2,)
    }

    player1.renderHP()
    player2.renderHP()
}