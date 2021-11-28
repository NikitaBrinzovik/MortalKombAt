import {createNewElement} from "../helpers/createElement.js";

export class Player {
    constructor(props) {
        this.player = props.player
        this.name = props.name
        this.hp = props.hp
        this.img = props.img
    }
    createPlayer = () => {
        const player = createNewElement("div", "player" + this.player)
        const progressbar = createNewElement("div", "progressbar")
        const life = createNewElement("div", "life")
        const name = createNewElement("div", "name")
        const character = createNewElement("div", "character")
        const img = createNewElement('img', "img")

        progressbar.appendChild(name)
        progressbar.appendChild(life)
        character.appendChild(img)
        player.appendChild(progressbar)
        player.appendChild(character)

        life.style.width = this.hp + "%"
        name.innerText = this.name
        img.src = this.img

        return player
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

