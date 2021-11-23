import {getIIPoints} from "../helth_points/getIIPoints.js";
import {getRandomNumber} from "../getRandomNumber.js";


export function enemyAttack() {
    const hit = getIIPoints()
    const defence = getIIPoints()

    return {
        value: getRandomNumber(HIT[hit]),
        hit,
        defence,
    }
}