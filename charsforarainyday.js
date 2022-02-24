archer: {
        //atk 50-70
        name: "Archer",
        image: "char2.jpg",
        maxHealth: 600,
        health: 600,
        attack: 65,
        critchance: 20,
        critdmg: 2,
        dodgechance: 0.15,
        defence: 1.2,
        attacks: {
            normaltAngrep: {
                name: 'Normal Attack',
                dmg: function() {
                    return randomNumber(50, 80);
                },
            },
            quickAttack: {
                name: 'Poison Arrow',
                dmg: function() {
                    return randomNumber(30, 70);
                },
            },
            tripleShot: {
                name: 'Dodge Shot',
                dmg: function() {
                    return randomNumber(20, 30);
                },
            },
            ultimate: {
                name: 'Dragon Arrow',
                dmg: function() {
                    return randomNumber(450, 550);
                },
            },
        }
    },
    vampire: {
        //atk 50-70
        name: "Vampire",
        image: "char3.jpg",
        maxHealth: 650,
        health: 650,
        attack: 55,
        critchance: 15,
        critdmg: 2,
        dodgechance: 0.15,
        defence: 1,
        attacks: {
            normaltAngrep: {
                name: 'Normal Attack',
                dmg: function() {
                    return randomNumber(50, 70);
                },
            },
            quickAttack: {
                name: 'Bat Attack',
                dmg: function() {
                    return randomNumber(35, 50);
                },
            },
            lifeDrain: {
                name: 'Life Drain',
                dmg: function() {
                    return randomNumber(40, 60);
                },
            },
            ultimate: {
                name: 'Siphon life',
                dmg: function() {
                    return randomNumber(300, 350);
                },
            },
        },
    },