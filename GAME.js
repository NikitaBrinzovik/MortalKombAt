import {Player, player1, player2} from "./store/players";
import {getIIPoints} from "./helpers/helth_points/getIIPoints";
import {getRandomNumber} from "./helpers/getRandomNumber";
import {HIT} from "./store/hit_points";
import {ATTACK} from "./store/body_parts_to_attack";
import {$arenas, $chat, $controlForm, $randomButton} from "./main";
import {createNewElement} from "./helpers/element_creaters/createNewElement";
import {startBattle} from "./helpers/logs_and_banners/startBanner";
import {commentInChat} from "./helpers/logs_and_banners/commentInChat";
import {generateLogs} from "./helpers/logs_and_banners/generateLogs";
import {winner} from "./helpers/element_creaters/createWinnerTitle";
import {createReloadButton} from "./helpers/element_creaters/createReloadButton";
import {mountainWinnerName} from "./helpers/logs_and_banners/bannerAtTheEndOfbattle";
import {logs} from "./store/logs";
import {createComment} from "./helpers/element_creaters/createComment";
import {getHoursAndMinutesNow} from "./helpers/date/getTime";
import {playerAttack} from "./helpers/action_functions/playerAttack";
import {enemyAttack} from "./helpers/action_functions/enemyAttck";
import {changeHPlayers} from "./helpers/helth_points/changeHPPlayers";
import {showResult} from "./helpers/logs_and_banners/showResult";



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
        this.$formFight = document.querySelector('.control');
        this.$chat = document.querySelector('.chat');
        this.player1 = new Player({player: 1, name: 'Vasiliy', img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif'});
        this.player2 = new Player({player: 2, name: 'mamitoAleksandrovna', img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif'});
        this.$controlForm = document.querySelector('.control')
    }
    fff =() => {
        $controlForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const playerHitPoints = playerAttack()
            const enemyHitPoint = enemyAttack()

            changeHPlayers(playerHitPoints, enemyHitPoint)
            showResult()

        })
    }


    getRandomNumber = (num) => Math.ceil(Math.random() * num)

    createNewElement(tag, className) {
        const $tag = document.createElement(tag)
        if (className) {
            $tag.classList.add(className)
        }
        return $tag
    }

    createPlayer(playerC) {
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

    getIIPoints = () => ATTACK[getRandomNumber(3) - 1]
    enemyAttack() {
        const hit = this.getIIPoints()
        const defence = this.getIIPoints()

        return {
            value: this.getRandomNumber(HIT[hit]),
            hit,
            defence,
        }
    }

    playerAttack() {
        const attack = {}
        for (let item of $controlForm) {
            let {checked, name, value} =item
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
    createReloadButton() {
        const $reloadWrap = createNewElement('div', 'reloadWrap');
        const $restartButton = createNewElement('button', 'button');

        $arenas.appendChild($reloadWrap)
        $reloadWrap.appendChild($restartButton);

        const $buttonRestart = document.querySelector(`.reloadWrap`, `.button`);
        $buttonRestart.addEventListener('click', () => {
            window.location.reload()
            startBattle(player1, player2)
        })

        $restartButton.innerText = 'Restart';
    }

    winner(name) {
        const $winnerTitle = createNewElement('div', 'winnerTitle')
        if (name) {
            $winnerTitle.innerText = `${name} wins!`
            return $winnerTitle
        }
        $winnerTitle.innerText = 'draw'
        return $winnerTitle
    }
    createComment = (text, damage, time, hp) =>
        $chat.insertAdjacentHTML('afterbegin', commentInChat(time,text, damage, hp))

    mountainWinnerName = (winnerName, loserName) => {
        if(!winnerName) {
            generateLogs('draw')
            return $arenas.appendChild(winner())
        }
        generateLogs("end", winnerName, loserName)
        $arenas.appendChild(winner(winnerName))
    }
    commentInChat = (time,text, damage, hp) => `<p>${time} ${text} ${damage} ${hp}</p>`



    showResult() {
        const {hp:myHP, name:myName}= player1
        const {hp:enemyHP, name:enemyName}= player2

        if (myHP === 0 || enemyHP === 0) {
            $randomButton.disabled = true
            createReloadButton()

            if (enemyHP === 0 && myHP !== 0) {
                return mountainWinnerName(myName, enemyName)
            }

            if (myHP === 0 && enemyHP !== 0) {
                return mountainWinnerName(enemyName, myName)
            }

            return mountainWinnerName()
        }
    }

    startBattle(player1, player2) {
        generateLogs('start', player1.name, player2.name)
    }

    text
    generateLogs(type, player1, player2, damage, hp) {
        const {name:myName} = player1
        const {name:enemyName} = player2

        switch (type) {
            case "draw":
                this.text = logs[type]
                return createComment(text, '', '', '');
            case "start" :
                this.text = logs[type]
                    .replace('[time]', getHoursAndMinutesNow())
                    .replace('[player1]', player1)
                    .replace('[player2]', player2)
                return createComment(text, '', '', '');
            case "end" :
                this.text = logs[type][getRandomNumber(3) - 1]
                    .replace('[playerWins]', player1)
                    .replace('[playerLose]', player2)
                return createComment(text, '', '', '');
            case 'defence':
                this.text = logs[type][getRandomNumber(8) - 1]
                    .replace('[playerKick]', myName)
                    .replace('[playerDefence]', enemyName)
                return createComment(`- ${text}`, '', getHoursAndMinutesNow(), '');

            default:
                this.text = logs[type][getRandomNumber(18) - 1]
                    .replace('[playerKick]', myName)
                    .replace('[playerDefence]', enemyName)
                return createComment(`- ${text}`, -damage, getHoursAndMinutesNow(), hp);
        }
    }

    //
    // start = () => {
    //
    //     this.$arenas.appendChild(this.createPlayer(this.player1));
    //     this.$arenas.appendChild(this.createPlayer(this.player2));
    //     this.generateLogs('start', this.player1, this.player2);
    //
    //     this.$formFight.addEventListener('submit',  (e) => {
    //         e.preventDefault();
    //
    //         const {hit: enemyHit, value: enemyHitValue, defence: enemyDefence} = this.enemyAttack();
    //         const {hit: playerHit, value: playerHitValue, defence: playerDefence} = this.playerAttack();
    //
    //         if(enemyHit !== playerDefence){
    //             this.player1.changeHP( enemyHitValue);
    //             this.player1.renderHP();
    //             this.generateLogs ('hit', this.player2, this.player1, enemyHitValue)
    //
    //         } else {
    //             this.generateLogs ('defence', this.player1, this.player2)
    //         }
    //
    //         if(playerHit !== enemyDefence) {
    //             this.player2.changeHP(playerHitValue);
    //             this.player2.renderHP();
    //             this.generateLogs ('hit', this.player1, this.player2, playerHitValue)
    //
    //         } else {
    //             this.generateLogs ('defence', this.player2, this.player1)
    //         }
    //
    //         this.showResult(this.player1, this.player2);
    //
    //     })
    // }
    changeHPlayers(player, enemy) {
        console.table(enemy)
        console.table(player)

        let {value:myDamage, hit:myTarget, defence:myDefence} = player
        let {value:enemyDamage, hit:enemyTarget, defence:enemyDefence} = enemy

        if (enemyTarget !== myDefence) {
            let hpAfterHit = player1.changeHP(enemyDamage)
            generateLogs('hit', player2, player1, enemyDamage,`[${hpAfterHit}/100]` )
        }

        if (enemyTarget === myDefence) {
            generateLogs('defence', player2, player1)
        }

        if (myTarget !== enemyDefence) {
            let hpAfterHit = player2.changeHP(myDamage)
            generateLogs('hit', player1, player2, myDamage, `[${hpAfterHit}/100]`)
        }

        if (myTarget === enemyDefence) {
            generateLogs('defence', player1, player2,)
        }

        player1.renderHP()
        player2.renderHP()
    }

}

export default Game