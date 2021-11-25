import {HIT} from "../store/hit_points.js";
import {ATTACK} from "../store/body_parts_to_attack.js";

import {logs} from "../store/logs.js";
import {Player} from "./players.js";


let time = new Date()
let hours, minutes

export const getHoursAndMinutesNow = () => {
    hours = time.getHours()
    minutes = time.getMinutes()
    return `${hours}:${minutes}`
}


export class Game {
    constructor(props) {
        this.$arenas = document.querySelector('.arenas');
        this.$chat = document.querySelector('.chat');
        this.$randomButton = document.querySelector('.button')
        this.$controlForm = document.querySelector('.control')
        this.player1 = new Player({
            player: 1,
            name: 'Vasiliy',
            img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif'
        });
        this.player2 = new Player({
            player: 2,
            name: 'mamitoAleksandrovna',
            img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif'
        });
    }

    text

    getRandomNumber = (num) => Math.ceil(Math.random() * num)

    createNewElement = (tag, className) => {
        const $tag = document.createElement(tag)
        if (className) {
            $tag.classList.add(className)
        }
        return $tag
    }

    createPlayer = (playerC) => {
        const player1 = this.createNewElement("div", "player" + playerC.player)
        const progressbar = this.createNewElement("div", "progressbar")
        const life = this.createNewElement("div", "life")
        const name = this.createNewElement("div", "name")
        const character = this.createNewElement("div", "character")
        const img = this.createNewElement('img', "img")

        progressbar.appendChild(name)
        progressbar.appendChild(life)
        character.appendChild(img)
        player1.appendChild(progressbar)
        player1.appendChild(character)

        life.style.width = playerC.hp + "%"
        name.innerText = playerC.name
        img.src = playerC.img

        return player1
    }

    getIIPoints = () => ATTACK[this.getRandomNumber(3) - 1]

    enemyAttack = () => {
        const hit = this.getIIPoints()
        const defence = this.getIIPoints()

        return {
            value: this.getRandomNumber(HIT[hit]),
            hit,
            defence,
        }
    }

    playerAttack = () => {
        const attack = {}
        for (let item of this.$controlForm) {
            let {checked, name, value} = item
            if (checked && name === 'hit') {
                attack.value = this.getRandomNumber(HIT[value])
                attack.hit = value
            }

            if (checked && name === 'defence') {
                attack.defence = value
            }

            item.checked = false
        }
        return attack
    }

    createReloadButton = () => {
        const $reloadWrap = this.createNewElement('div', 'reloadWrap');
        const $restartButton = this.createNewElement('button', 'button');

        this.$arenas.appendChild($reloadWrap)
        $reloadWrap.appendChild($restartButton);

        const $buttonRestart = document.querySelector(`.reloadWrap`, `.button`);
        $buttonRestart.addEventListener('click', () => {
            window.location.reload()
            this.startBattle(this.player1, this.player2)
        })
        $restartButton.innerText = 'Restart';
    }

    winner = (name) => {
        const $winnerTitle = this.createNewElement('div', 'winnerTitle')
        if (name) {
            $winnerTitle.innerText = `${name} wins!`
            return $winnerTitle
        }
        $winnerTitle.innerText = 'draw'
        return $winnerTitle
    }

    createComment = (text, damage, time, hp) =>
        this.$chat.insertAdjacentHTML('afterbegin', this.commentInChat(time, text, damage, hp))

    mountainWinnerName = (winnerName, loserName) => {
        if (!winnerName) {
            this.generateLogs('draw')
            return this.$arenas.appendChild(this.winner())
        }
        this.generateLogs("end", winnerName, loserName)
        this.$arenas.appendChild(this.winner(winnerName))
    }

    commentInChat = (time, text, damage, hp) => `<p>${time} ${text} ${damage} ${hp}</p>`

    showResult = () => {
        const {hp: myHP, name: myName} = this.player1
        const {hp: enemyHP, name: enemyName} = this.player2

        if (myHP === 0 || enemyHP === 0) {
            this.$randomButton.disabled = true
            this.createReloadButton()

            if (enemyHP === 0 && myHP !== 0) {
                return this.mountainWinnerName(myName, enemyName)
            }

            if (myHP === 0 && enemyHP !== 0) {
                return this.mountainWinnerName(enemyName, myName)
            }

            return this.mountainWinnerName()
        }
    }

    startBattle = (player1, player2) => {
        this.generateLogs('start', player1.name, player2.name)
    }

    generateLogs = (type, player1, player2, damage, hp) => {
        const {name: myName} = player1
        const {name: enemyName} = player2

        switch (type) {
            case "draw":
                this.text = logs[type]
                return this.createComment(this.text, '', '', '');
            case "start" :
                this.text = logs[type]
                    .replace('[time]', getHoursAndMinutesNow())
                    .replace('[player1]', player1)
                    .replace('[player2]', player2)
                return this.createComment(this.text, '', '', '');
            case "end" :
                this.text = logs[type][this.getRandomNumber(3) - 1]
                    .replace('[playerWins]', player1)
                    .replace('[playerLose]', player2)
                return this.createComment(this.text, '', '', '');
            case 'defence':
                this.text = logs[type][this.getRandomNumber(8) - 1]
                    .replace('[playerKick]', myName)
                    .replace('[playerDefence]', enemyName)
                return this.createComment(`- ${this.text}`, '', getHoursAndMinutesNow(), '');

            default:
                this.text = logs[type][this.getRandomNumber(18) - 1]
                    .replace('[playerKick]', myName)
                    .replace('[playerDefence]', enemyName)
                return this.createComment(`- ${this.text}`, -damage, getHoursAndMinutesNow(), hp);
        }
    }

    changeHPlayers = (player, enemy) => {
        console.table(enemy)
        console.table(player)

        let {value: myDamage, hit: myTarget, defence: myDefence} = player
        let {value: enemyDamage, hit: enemyTarget, defence: enemyDefence} = enemy

        if (enemyTarget !== myDefence) {
            let hpAfterHit = this.player1.changeHP(enemyDamage)
            this.generateLogs('hit', this.player2, this.player1, enemyDamage, `[${hpAfterHit}/100]`)
        }

        if (enemyTarget === myDefence) {
            this.generateLogs('defence', this.player2, this.player1)
        }

        if (myTarget !== enemyDefence) {
            let hpAfterHit = this.player2.changeHP(myDamage)
            this.generateLogs('hit', this.player1, this.player2, myDamage, `[${hpAfterHit}/100]`)
        }

        if (myTarget === enemyDefence) {
            this.generateLogs('defence', this.player1, this.player2,)
        }

        this.player1.renderHP()
        this.player2.renderHP()
    }
    start = () => {

        this.$arenas.appendChild(this.createPlayer(this.player1));
        this.$arenas.appendChild(this.createPlayer(this.player2));
        this.generateLogs('start', this.player1, this.player2);

        this.$controlForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const playerHitPoints = this.playerAttack()
            const enemyHitPoint = this.enemyAttack()


            this.changeHPlayers(playerHitPoints, enemyHitPoint)
            this.showResult()
        })
    }

}

export default Game