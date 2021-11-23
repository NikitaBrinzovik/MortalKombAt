import {player1, player2} from "../../store/players.js";
import {$randomButton} from "../../main.js";
import {mountainWinnerName} from "./bannerAtTheEndOfbattle.js";
import {createReloadButton} from "../element_creaters/createReloadButton.js";

export function showResult() {
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