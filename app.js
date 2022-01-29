const resetGame = document.getElementById('reset-game');
const modalBtn = document.getElementById('modal-btn');

const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');

//Player
const player = document.getElementById('player');
const playerHealth = document.querySelector('.player-health');
const select = document.getElementById('select-moves');
const playerPos = document.getElementById('player-img');

//Opponent
const opponent = document.getElementById('opponent');
const opponentHealth = document.getElementById('opponent-health');
const opponentPos = document.getElementById('opponent-img')

//Defend and Attack
const attack = document.getElementById('attack');
const defend = document.getElementById('defend');
const attackVector = document.getElementById('attack-vector');
const defenceVector = document.getElementById('defence');

//Console
const gameConsole = document.getElementById('console');

//Settings Class
class Settings {
    static startGame = () => {
        const gameStarted = true;
        return gameStarted;
    }
    //Disable then re-enable during gameplay
    static disableControls = () => {
        select.classList.remove('active');
        setTimeout(Settings.enableControls, 4000);
    }

    static enableControls = () => {
        select.classList.add('active');
        gameConsole.innerHTML = '';
    }

    static gameEnded = () => {
        modal.classList.add('active');
    }
}

//Animation Specs........
class Animation {
    static animateAttack = () => {
        attackVector.classList.add('active');
        setTimeout(Animation.removeAnimateAttack, 2000);
    }

    static removeAnimateAttack = () => attackVector.classList.remove('active');

    static animateDefense = () => {
        defenceVector.classList.add('active');
        setTimeout(Animation.removeAnimateDefence, 4000);
    }

    static removeAnimateDefence = () => defenceVector.classList.remove('active');
}


//General Character Class
class Character {
    constructor(health, speed, defense, attack) {
        this.health = health;
        this.speed = speed;
        this.defense = defense;
        this.attack = attack;
    }

    //General attack
    attackOpponent = () => {
        Settings.disableControls();
        opponent1.healthPoints(p1.attack);
        Animation.animateAttack();
    }

    //Defend attack
    defend = () => {
        Character.dialogue('Great defense by the Wolf');
        Settings.disableControls();
        Animation.animateDefense();
    }

    static dialogue = (text) => {
        const textEl = document.createElement('p');
        textEl.innerText = text;
        Settings.disableControls();
        gameConsole.appendChild(textEl);
        //Note: Text cleared in Settings, enableControls method after turn plays out
    }

  
    healthPoints = (damage) => {
        let hp = this.health - damage;
        this.health = hp

        if(this.health > 35) {
            playerHealth.style.width = `${this.health}%`; 
            console.log(this.health)
        } else if(this.health > 10) {
            playerHealth.style.width = `${this.health}%`; 
            playerHealth.style.background = 'orange';
            console.log(this.health)
        } else if(this.health >= 0) {
            playerHealth.style.width = `${this.health}%`; 
            playerHealth.style.background = 'red';
            console.log(this.health)
        } else {
            playerHealth.style.background = 'rgba(0, 0, 0, 0)';
            setTimeout(Settings.gameEnded, 3000);
            modalText.innerText = 'GAME OVER. YOU LOOSE!'
        }
    }

}


//Player Specific Subclass
class Player extends Character {
    constructor(health, speed, defense, attack) {
        super(health, speed, defense, attack);
    }  
}

//Opponent Specific Subclass 
class Opponent extends Character {
    constructor(health, speed, defense, attack) {
        super(health, speed, defense, attack);
    }

    cpuDecision = () => {
        let chance = Math.floor(Math.random() * 10);

        return chance <= 5 ? opponent1.attackOpponent() : Character.dialogue('The Cult Leader failed their attack');
    }

        //Cpu attack
        attackOpponent = () => {
        p1.healthPoints(opponent1.attack);
        Settings.disableControls();
        Animation.animateAttack();
    }


    healthPoints = (damage) => {
        let hp = this.health - damage - 1;
        this.health = hp

        if(this.health > 35) {
            opponentHealth.style.width = `${this.health}%`; 
            console.log(this.health)
        } else if(this.health > 10) {
            opponentHealth.style.width = `${this.health}%`; 
            opponentHealth.style.background = 'orange';
            console.log(this.health)
        } else if(this.health >= 0) {
            opponentHealth.style.width = `${this.health}%`; 
            opponentHealth.style.background = 'red';
            console.log(this.health)
        } else {
            opponentHealth.style.background = 'rgba(0, 0, 0, 0)';
            setTimeout(Settings.gameEnded, 3000);
            modalText.innerText = 'YOU BEAT THE CULT LEADER. HOORAY!';
        }
    }
}

//Start game on page load
document.addEventListener('DOMContentLoaded', () => {
    Settings.startGame();
    setTimeout(Settings.enableControls, 1000);
})



//Event: Instantiate Player and Opponent
const p1 = new Player(100, 50, 10, 12);
const opponent1 = new Opponent(100, 40, 10, 10);


//Event: Use logic to pick who attacks or defends first. Decide who damage is delt to. Decide how opponent chooses to act.
attack.addEventListener('click', () => {
    if(Math.floor(Math.random() * p1.speed + 15) >= opponent1.speed) {
        p1.attackOpponent();
        opponent1.cpuDecision();
        Character.dialogue('Wolf got the first move. Nice Speed!')
    } else {
        Character.dialogue('Cult Leader showed speed speed this round and moved first!')
        opponent1.cpuDecision();
        p1.attackOpponent();
    }
})

//Event: When defend is selected. Give player the chance to fend off attack
defend.addEventListener('click', () => {
    if(Math.floor(Math.random() * p1.speed + 15) >= opponent1.speed) {
        p1.defend();
        Character.dialogue('Wolf has defended Cult Leader\'s attack');
    } else {
        opponent1.cpuDecision();
        Character.dialogue('Oh no! Wolf\'s blocking did nothing');
    }
})

//Reset Game
resetGame.addEventListener('click', () => window.location.reload())
modalBtn.addEventListener('click', () => window.location.reload())

//Exports
exports.startGame = Settings.startGame;
//Methods used
//Testing
//OOP - Yes!
//Conditionals - Yes!


