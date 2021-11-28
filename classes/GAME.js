import {HIT} from "../store/hit_points.js";
import {ATTACK} from "../store/body_parts_to_attack.js";

import {logs} from "../store/logs.js";
import {Player} from "./players.js";
import {createNewElement} from "../helpers/createElement.js";
import {getRandomNumber} from "../helpers/getRandomNumber.js";


let time = new Date()
let hours, minutes

export const getHoursAndMinutesNow = () => {
    hours = time.getHours()
    minutes = time.getMinutes()
    return `${hours}:${minutes}`
}

let player1
let player2

export class Game {
    constructor(props) {
        this.$arenas = document.querySelector('.arenas');
        this.$chat = document.querySelector('.chat');
        this.$randomButton = document.querySelector('.button')
        this.$controlForm = document.querySelector('.control')
    }

    text

    getPlayers = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json())
        return body
    }
    getEnemy = async ()=> {
        const enemyFromAPI = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json())
        return enemyFromAPI
    }

    getIIPoints = () => ATTACK[getRandomNumber(3) - 1]

    helper = async () => {
        return fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify({
                
                hit:'foot',
                // hit: this.getIIPoints(),
                // defence: this.getIIPoints(),
                defence: 'foot',
            })


        })
        // console.log(body, '=================ss=====================')
        // return {
        //     value:getRandomNumber(HIT[hit]),
        //     hit,
        //     defence,
        // }

    }
    enemyAttack = () => {
        const hit = this.getIIPoints()
        const defence = this.getIIPoints()

        return {
            value:getRandomNumber(HIT[hit]),
            hit,
            defence,
        }


    }

    playerAttack = () => {
        const attack = {}
        for (let item of this.$controlForm) {
            let {checked, name, value} = item
            if (checked && name === 'hit') {
                attack.value = getRandomNumber(HIT[value])
                attack.hit = value
            }

            if (checked && name === 'defence') {
                attack.defence = value
            }

            item.checked = false
        }
        return attack
    }

    changeHPlayers = (player, enemy) => {
        console.table(enemy)
        console.table(player)
        console.log('-----------sosi jopy---------------')

        let {value: myDamage, hit: myTarget, defence: myDefence} = player
        let {value: enemyDamage, hit: enemyTarget, defence: enemyDefence} = enemy
        console.log(enemyDamage, enemyTarget, enemyDefence)

        if (enemyTarget !== myDefence) {
            const hpAfterHit = player1.changeHP(enemyDamage)
            this.generateLogs('hit', player2, player1, enemyDamage, `[${hpAfterHit}/100]`)
        }

        if (enemyTarget === myDefence) {
            this.generateLogs('defence', player2, player1)
        }

        if (myTarget !== enemyDefence) {
            const hpAfterHit = player2.changeHP(myDamage)
            this.generateLogs('hit', player1, player2, myDamage, `[${hpAfterHit}/100]`)
        }

        if (myTarget === enemyDefence) {
            this.generateLogs('defence', player1, player2,)
        }

        player1.renderHP()
        player2.renderHP()
    }

    createReloadButton = () => {
        const $reloadWrap = createNewElement('div', 'reloadWrap');
        const $restartButton = createNewElement('button', 'button');

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
        const $winnerTitle = createNewElement('div', 'winnerTitle')
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
        const {hp: myHP, name: myName} = player1
        const {hp: enemyHP, name: enemyName} = player2

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
                this.text = logs[type][getRandomNumber(3) - 1]
                    .replace('[playerWins]', player1)
                    .replace('[playerLose]', player2)
                return this.createComment(this.text, '', '', '');
            case 'defence':
                this.text = logs[type][getRandomNumber(8) - 1]
                    .replace('[playerKick]', myName)
                    .replace('[playerDefence]', enemyName)
                return this.createComment(`- ${this.text}`, '', getHoursAndMinutesNow(), '');

            default:
                this.text = logs[type][getRandomNumber(18) - 1]
                    .replace('[playerKick]', myName)
                    .replace('[playerDefence]', enemyName)
                return this.createComment(`- ${this.text}`, -damage, getHoursAndMinutesNow(), hp);
        }
    }

    start = async () => {
        const players = await this.getPlayers();
        console.log(players)
        const pl1 = players[getRandomNumber(players.length) - 1]
        // const pl2 = players[getRandomNumber(players.length) - 1]
        const pl2 = await this.getEnemy()
        console.log(pl2, 'ffffffffffffffffff')
        console.log(pl1, pl2)
        player1 = new Player({
            ...pl1,
            player: 1,
            rootSelector: 'arenas',
        })
        player2 = new Player({
            ...pl2,
            player: 2,
            rootSelector: 'arenas',
        })
        console.log(this.helper(), '9999999999999')
        this.$arenas.appendChild(player1.createPlayer());
        this.$arenas.appendChild(player2.createPlayer());
        this.$controlForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const playerHitPoints = this.playerAttack()
            const enemyHitPoint = this.helper()
            // const enemyHitPoint = this.enemyAttack()

            this.changeHPlayers(playerHitPoints, enemyHitPoint)
            this.showResult()
        })
        return this.startBattle(player1, player2);

    }

    startBattle = (player1, player2) => {
        this.generateLogs('start', player1.name, player2.name)
    }
}

export default Game