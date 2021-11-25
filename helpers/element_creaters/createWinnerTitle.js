import {createNewElement} from "./createNewElement.js";


export function winner(name) {
    const $winnerTitle = createNewElement('div', 'winnerTitle')
    if (name) {
        $winnerTitle.innerText = `${name} wins!`
        return $winnerTitle
    }
    $winnerTitle.innerText = 'draw'
    return $winnerTitle
}