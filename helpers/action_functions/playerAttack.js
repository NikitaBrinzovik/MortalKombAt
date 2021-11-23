import {$controlForm} from "../../main.js";
import {getRandomNumber} from "../getRandomNumber.js";
import {HIT} from "../../store/hit_points.js";


export function playerAttack() {
    const attack = {}
    for (let itemss of $controlForm) {
        if (itemss.checked && itemss.name === 'hit') {
            attack.value = getRandomNumber(HIT[itemss.value])
            attack.hit = itemss.value
        }

        if (itemss.checked && itemss.name === 'defence') {
            attack.defence = itemss.value
        }

        itemss.checked = false
    }

    return attack

}