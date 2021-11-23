import {$controlForm} from "../../main.js";
import {getRandomNumber} from "../getRandomNumber.js";
import {HIT} from "../../store/hit_points.js";


export function playerAttack() {
    const attack = {}
    for (let itemss of $controlForm) {
        let {checked, name, value} =itemss
        if (checked && name === 'hit') {
            attack.value = getRandomNumber(HIT[value])
            attack.hit = itemss.value
        }

        if (checked && name === 'defence') {
            attack.defence = value
        }
        /**
        * Зар привет! Подскажи пожалуйста, почему если я тут пишу просто checked - не срабатывает сброс?
         **/
        itemss.checked = false
    }

    return attack

}