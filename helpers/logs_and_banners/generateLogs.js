import {createComment} from "../element_creaters/createComment.js";
import {getHoursAndMinutesNow} from "../date/getTime.js";
import {logs} from "../../store/logs.js";
import {getRandomNumber} from "../getRandomNumber.js";


let text
export function generateLogs(type, player1, player2, damage, hp) {
    const {name:myName} = player1
    const {name:enemyName} = player2
    
    switch (type) {
        case "draw":
            text = logs[type]
            return createComment(text, '', '', '');
        case "start" :
            text = logs[type]
                .replace('[time]', getHoursAndMinutesNow())
                .replace('[player1]', player1)
                .replace('[player2]', player2)
            return createComment(text, '', '', '');
        case "end" :
            text = logs[type][getRandomNumber(3) - 1]
                .replace('[playerWins]', player1)
                .replace('[playerLose]', player2)
            return createComment(text, '', '', '');
        case 'defence':
            text = logs[type][getRandomNumber(8) - 1]
                .replace('[playerKick]', myName)
                .replace('[playerDefence]', enemyName)
            return createComment(`- ${text}`, '', getHoursAndMinutesNow(), '');

        default:
            text = logs[type][getRandomNumber(18) - 1]
                .replace('[playerKick]', myName)
                .replace('[playerDefence]', enemyName)
            return createComment(`- ${text}`, -damage, getHoursAndMinutesNow(), hp);
    }
}