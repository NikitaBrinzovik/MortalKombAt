/*import {changeHP} from "../helpers/helth_points/changeHP.js";
import {renderHP} from "../helpers/helth_points/renderHP.js";
import {elementHP} from "../helpers/helth_points/elementHP.js";*/


export class Player {
    constructor(props) {
        this.player = props.player
        this.name = props.name
        this.hp = props.hp
        this.img = props.img
    }

    renderHP = () => {
        this.elementHP().style.width = this.hp + '%'
    }
    changeHP = (hitPoints) => {
        this.hp -= hitPoints

        if (this.hp <= 0) {
            return this.hp = 0
        }
        return this.hp
    }
    elementHP = () => {
        return document.querySelector(`.player${this.player} .life`)
    }
    attack =()=> {
        return console.log(`${this.name} Fight...`)
    }
}

export const player1 = new Player({
    name: "Vasiliy",
    player: 1,
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
})
export const player2  = new Player ({
    player: 2,
    name: "mamitoAleksandrovna",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
})





/*
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
}*/
