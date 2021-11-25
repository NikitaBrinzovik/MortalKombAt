import {getRandomNumber} from "../getRandomNumber.js";
import {ATTACK} from "../../store/body_parts_to_attack.js";

export const getIIPoints = () => ATTACK[getRandomNumber(3) - 1]