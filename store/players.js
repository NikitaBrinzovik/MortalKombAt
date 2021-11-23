import {changeHP} from "../helpers/helth_points/changeHP.js";
import {renderHP} from "../helpers/helth_points/renderHP.js";
import {elementHP} from "../helpers/helth_points/elementHP.js";

export const player1 = {
    name: "Vasiliy",
    player: 1,
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ["Vodka", "Seledka"],
    attack: function () {
        return console.log(`${this.name} Fight...`)
    },
    elementHP,
    changeHP,
    renderHP,
}
export const player2 = {
    player: 2,
    name: "mamitoAleksandrovna",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
    weapon: ["Vodka", "Seledka"],
    attack: function () {
        return console.log(`${this.name} Fight...`)
    },
    elementHP,
    changeHP,
    renderHP,
}