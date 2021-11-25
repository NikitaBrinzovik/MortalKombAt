import {getIIPoints} from "../helth_points/getIIPoints.js";
import {getRandomNumber} from "../getRandomNumber.js";
import {HIT} from "../../store/hit_points.js";


export function enemyAttack() {
    const hit = getIIPoints()
    const defence = getIIPoints()

    return {
        value: getRandomNumber(HIT[hit]),
        hit,
        defence,
    }
}