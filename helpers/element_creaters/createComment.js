import {$chat} from "../../main.js";
import {commentInChat} from "../logs_and_banners/commentInChat.js";


export const createComment = (text, damage, time, hp) =>
    $chat.insertAdjacentHTML('afterbegin', commentInChat(time,text, damage, hp))
