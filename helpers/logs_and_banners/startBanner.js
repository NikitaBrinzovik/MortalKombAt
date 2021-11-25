import {generateLogs} from "./generateLogs.js";

export function startBattle(player1, player2) {
    generateLogs('start', player1.name, player2.name)
}