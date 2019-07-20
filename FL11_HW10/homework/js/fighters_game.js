class Fighter {
  constructor(obj) {
    const name = obj.name;
    let damage = obj.damage;
    let hp = obj.hp;
    const totalHp = obj.hp;
    const agility = obj.agility;
    let wins = 0;
    let losses = 0;

    this.getName = function() {
      return name
    }
    this.getDamage = function() {
      return damage
    }
    this.getAgility = function() {
      return agility
    }
    this.getHealth = function() {
      return hp
    }
    this.getTotalHp = function() {
      return totalHp
    }
    this.getWins = function() {
      return wins
    }
    this.getLosses = function() {
      return losses
    }

    this.setHp = (newAmount) => {
      hp = newAmount
    }
    this.addWin = () => {
      wins += 1
    }
    this.addLoss = () => {
      losses += 1
    }  
  }

  dealDamage(hp) {
    let newHp = this.getHealth() - hp;
    if (newHp < 0) {
      newHp = 0
    }
    this.setHp(newHp)
  }
  attack(defender) {
    const hundredPercent = 100;
    const successProbability = hundredPercent - defender.getAgility();
    const random = Math.round(Math.random() * (hundredPercent - 1 + 1)) + 1;
    let successful = random < successProbability;

    if (successful) {
      const attackerDamage = this.getDamage();
      defender.dealDamage(attackerDamage);

      return `${this.getName()} make ${this.getDamage()} damage to ${defender.getName()}`
    } else if (!successful) {
      return `${this.getName()} attack missed`
    }
  }
  heal(hp) {
    let newAmountHp = this.getHealth() + hp;
    if (newAmountHp > this.getTotalHp()) {
      newAmountHp = this.getTotalHp()
    }
    this.setHp(newAmountHp)
  }
  logCombatHistory() {
    return `Name: ${this.getName()}, Wins: ${this.getWins()}, Losses: ${this.getLosses()}`
  }
}

function battle(fighter1, fighter2) {
  if (fighter1.getHealth() !== 0 && fighter2.getHealth() !== 0) {
    do {
      console.log(fighter1.attack(fighter2))
      if (fighter2.getHealth() === 0) {
        fighter1.addWin();
        fighter2.addLoss();
        break
      }
      console.log(fighter2.attack(fighter1))
      if (fighter1.getHealth() === 0) {
        fighter2.addWin();
        fighter1.addLoss();
        break
      }
    } while(fighter1.getHealth() !== 0 && fighter2.getHealth() !== 0)
  } else if (fighter1.getHealth() === 0) {
    return `${fighter1.getName()} is dead and can't fight`
  } else if (fighter2.getHealth() === 0){
    return `${fighter2.getName()} is dead and can't fight`
  }
}

let thor = new Fighter({name: 'Thor', damage: 20, agility: 20, hp: 150});
let hela = new Fighter({name: 'Hela', damage: 25, agility: 30, hp: 130});

console.log(battle(thor, hela))
console.log(thor.getHealth());
console.log(hela.getHealth());
console.log(thor.logCombatHistory());
console.log(hela.logCombatHistory());
console.log(battle(thor, hela))