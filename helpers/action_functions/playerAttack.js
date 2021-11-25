import {$controlForm} from "../../main.js";
import {getRandomNumber} from "../getRandomNumber.js";
import {HIT} from "../../store/hit_points.js";


export function playerAttack() {
    const attack = {}
    for (let item of $controlForm) {
        let {checked, name, value} =item
        if (checked && name === 'hit') {
            attack.value = getRandomNumber(HIT[value])
            attack.hit = value
        }

        if (checked && name === 'defence') {
            attack.defence = value
        }

        item.checked = false
    }

    return attack

}