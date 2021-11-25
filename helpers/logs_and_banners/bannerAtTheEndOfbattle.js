import {generateLogs} from "./generateLogs.js";
import {winner} from "../element_creaters/createWinnerTitle.js";
import {$arenas} from "../../main.js";

export const mountainWinnerName = (winnerName, loserName) => {
    if(!winnerName) {
        generateLogs('draw')
        return $arenas.appendChild(winner())
    }
    generateLogs("end", winnerName, loserName)
    $arenas.appendChild(winner(winnerName))
}