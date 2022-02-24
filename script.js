//MODEL
let logg = [];

let characters = {
    knight: {
        //atk 50-70
        name: "Knight",
        image: "char1.png",
        maxHealth: 800,
        health: 800,
        critchance: 10,
        critdmg: 2,
        dodgechance: 15,
        defence: 0.9,
        attacks: {
            normaltAngrep: {
                name: 'Normal Attack',
                dmg: function() {
                    return randomNumber(50, 70);
                },
            },
            quickAttack: {
                name: 'Stun Attack',
                dmg: function() {
                    return randomNumber(30, 60);
                },
            },
            bolster: {
                name: 'Bolster',
                dmg: function() {
                    return randomNumber(0, 0);
                },
            },
            ultimate: {
                name: 'Phallanx Charge',
                dmg: function() {
                    return randomNumber(300, 350);
                },
            },
        }
    },

    demon: {
        maxHealth: 1000,
        health: 1000,
    },

}


let player = characters.knight;
let boss = characters.demon;
let statusEffect = '';
let ultCharge = 0
let ultStatus = false
let turn = 0;
let win = false;
let playerTurn = true;
let fightResult = "";
console.log()

//VIEW 
show();

function show() {
    const app = document.getElementById('app')
    app.innerHTML = /*HTML*/ `

     <div class=" ${win ? "" : 'hidden'} result">
        <div>
            ${fightResult}
            <img class="tryagain" src="trihard.png" onclick="window.location.reload()"/> 
        </div>
         
    </div> 
    <div class="fight"> 
        <div class="status">
            <div class="player-hp" style="width: ${player.health / player.maxHealth * 100}%"></div>
            <div class="hp-divider">
                <img src="crossed-swords.png"/>
            </div>
            <div class="enemy-hp"  style="width: ${boss.health / boss.maxHealth * 100}%"></div>
        </div>
        <div id="player">
            <img src="${player.image}"/>
            <div class="ultimatebar ${ultCharge == 100 ? "charged" : ""}">
                <div class="ultcharge" style="width: ${ultCharge}%"></div>
            </div>
        </div>

        <div id="enemy">
            <img src="demon.png"/>
        </div>
    </div>
    <div class="menu">
        <img src="scroll.png" alt="" />
        <div id="attacks" class="attacks">
        </div>
        <div id="log" class="log">
            <h3>Turn: ${turn}</h3>
        </div>
    </div>
     

  `
    const backgroundMusic = document.getElementById('backgroundmusic')
    const log = document.getElementById('log')
    const attacks = document.getElementById('attacks')

    backgroundMusic.volume = 0.1
    backgroundMusic.play()

    for (let i = logg.length - 1; i >= 0; i--) {
        const msg = logg[i];
        log.innerHTML += `<p>${msg}</p>`
    }

    for (const key in player.attacks) {
        if (Object.hasOwnProperty.call(player.attacks, key)) {
            const attack = player.attacks[key];
            attacks.innerHTML += `
                <div onclick="fight('${key}')" class="attack ${key == 'ultimate' ? 'ultimate' : ""} ">
                    <p></p>${attack.name}</p>
                </div>
            `
        }
    }
}

//CONTROLLER
function randomNumber(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min);
}

function chargeUlt(min, max) {
    let ultnum = randomNumber(min, max)

    if (ultCharge == 100) return;

    if ((ultCharge + ultnum) >= 100) {
        ultCharge = 100;
        logg.push('ULTIMATE READY')
    } else {
        ultCharge += ultnum;
        logg.push('Ultimate charged by ' + ultnum)
    }
    console.log(ultnum)
}

function fight(attackName) {
    statusEffect = "";
    if (!win && playerTurn) {
        attack(attackName)
        show();
    }
}




function attack(attack) {
    let crit = false;
    let att = player.attacks[attack]
    let dmg = att.dmg()
    if (randomNumber(1, 100) <= player.critchance) {
        crit = true
        dmg = dmg * player.critdmg;
    }

    if (attack == 'bolster') {
        bolster();
    } else if (attack == 'quickAttack') {
        stunAttack();

    } else if (attack == 'ultimate') {
        if (ultCharge < 100) {
            logg.push('Your ultimate is not ready yet')
            return
        } else {
            phallanxCharge();
        }
    }

    if (crit) {
        if (attack != 'bolster') {
            logg.push(`${att.name} CRIT FOR ${dmg} DMG`)
        }
    } else {
        if (attack != 'bolster') {
            logg.push(`${att.name} hit for ${dmg} dmg`)
        }

    }

    if ((boss.health - dmg) < 0) {
        boss.health = 0;
        logg.push('you win')
        win = true;
        fightResult = '<img src="winChest.png"/>'

    } else {
        setTimeout(statusEffect == '' ? bossAttack : stun, randomNumber(700, 1200));
        // statusEffect == '' ? bossAttack() : logg.push('The boss is stunned and did not attack');

        boss.health -= dmg;
    }

    turn++;
    playerTurn = false;


    function stun() {
        logg.push('The boss is stunned and did not attack');
        playerTurn = true;
        show();
    }

    function bolster() {
        if (randomNumber(1, 20) >= 9) {
            statusEffect = 'stunned'
            logg.push(`${att.name} stunned the Boss`)
        } else {
            logg.push(`${att.name} did not stun`)
        }
        chargeUlt(15, 25)
    }

    function stunAttack() {
        if (randomNumber(1, 20) >= 15) {
            statusEffect = 'stunned'
            logg.push(`${att.name} stunned the Boss`)
        }

        chargeUlt(10, 20);
    }

    function phallanxCharge() {
        if (ultCharge == 100) {
            ultCharge = 0;
            if (randomNumber(1, 20) >= 5) {
                statusEffect = 'stunned'
                logg.push(`${att.name} stunned the Boss`)
                    // logg.push(`${att.name} hit for ${dmg} dmg`)
            }
        }
    }
}

function bossAttack() {
    let bdmg = randomNumber(50, 100);
    if (randomNumber(0, 100) <= player.dodgechance) {
        bdmg = 0
        logg.push("You dodged the boss' attack")
    } else {
        logg.push(`Boss hit you for ${bdmg}`)
    }
    if ((player.health - bdmg) < 0) {
        player.health = 0
        logg.push('You lose')
        win = true;
        fightResult = '<img src="lostdemon.png"/>'
    } else {
        player.health -= bdmg;
    }

    playerTurn = true;
    show();
}



/*TODO




    - HP bar tall

*/

// function turn()
// -Se etter effecter fra forrige runde og avklare dem
// -Regn ut dmg fra player og boss
// -Sjekke om noen når 0hp
// -Juster lifstotal
// -Legge til alternative effecter (DoT, Defence up, Stun, osv.)
// -Lade opp Ultimate
// -Logge