//I felt really "free to play" and added a few things by myself
//some comments in the code and a small guide at the end will help you sort it out.

//let's imagine we get these ids from some database
const playersIds = []

// so we can operate with types, species and update them easily in the future
const fireTypes = ['charmander', 'charmeleon', 'charizard']
const electricTypes = ['pichu', 'pikachu', 'raichu']
const characterTypesAll = [fireTypes, electricTypes]

const fireSpecies = ['lizard pokemon', 'flame pokemon', 'flame pokemon']
const electricSpecies = ['mouse pokemon', 'mouse pokemon', 'mouse pokemon']
const characterSpeciesAll = [fireSpecies, electricSpecies]

function Character(tp, sp, pokType, name, healthMultiplier, attackMultiplier) {
  let type = tp;
  let species = sp;
  let pokemonType = pokType;
  let flying = false;
  let id = playersIds.length;
           playersIds.push(id)
  
  let experience = 0;
  const baseHealth = 2000;
  const baseAttack = 200;
  let healthPoints = baseHealth*healthMultiplier;
  let attackPoints = baseAttack*attackMultiplier;

  if (pokemonType === 'charizard') {
    flying = true
  }

  this.updateCharacter = function () {
    this.workWithExperience(0)//reset experience when a character evolves
    
    switch(this.getPokemonType()) {
      case 'charmeleon':
          healthPoints = baseHealth*3;
          attackPoints = baseAttack*2;
          this.__proto__ = Charmeleon.prototype//to get access to Charmeleon's methods
          return this
        
      case 'charizard':
          healthPoints = baseHealth*5;
          attackPoints = baseAttack*3;
          flying = true
          this.__proto__ = Charizard.prototype
          return this

      case 'pikachu':
          healthPoints = baseHealth*2;
          attackPoints = baseAttack*3;
          this.__proto__ = Pikachu.prototype
          return this

      case 'raichu':
          healthPoints = baseHealth*3;
          attackPoints = baseAttack*5;
          this.__proto__ = Raichu.prototype
          return this  

      default:
        return 'error in character update'
    }
  }

  //OBLIGATORY METHODS
  this.getType = () => type;
  this.getSpecie = () => species;
  this.canFly = () => flying;
  this.getPokemonType = () => pokemonType;
  //you can find evolve in the prototype as it doesn't access private properties directly

  //properies and methods added by me
  this.name = name;
  this.getHealthPoints = () => healthPoints;
  this.setHealthPoints = (newAmount) => {
    healthPoints = newAmount;
    return healthPoints
  };
  this.getAttackPoints = () => attackPoints;
  this.setAttackPoints = (newAmount) => {
    attackPoints = newAmount;
    return attackPoints
  }
  this.setPokemonType = (newType, newSpecie) => {
    pokemonType = newType
    species = newSpecie
    return this.updateCharacter()
  }
  this.getExperience = () => experience;
  this.setExperience = (newAmount) => {
    experience = newAmount
  }
  /* this.workWithExperience = (newAmount) => {
    
    if (!newAmount) { // adding points in case of a win
      this.setExperience(this.getExperience() + 1)
      this.setAttackPoints(this.getAttackPoints() + 2)
      this.setHealthPoints(this.getAttackPoints() + 20)
    } else { //reseting when a character evolves
      this.setExperience(newAmount)
    }
    
    if (this.getExperience() === 50) { //when a character reaches 50 points in experience, they evolve
      this.evolve()
    }
  } */
}
Character.prototype.evolve = function() { 
  let currentPokemonType = this.getPokemonType();

  // looping through all the types to find the next type and specie if the current pokemon type is not the last
  for (let generalType = 0; generalType < characterTypesAll.length; generalType++) {
    for (let pokemonType = 0; pokemonType < characterTypesAll[generalType].length; pokemonType++){
      if (currentPokemonType === characterTypesAll[generalType][pokemonType]) {
        let lastPokemonType = characterTypesAll[generalType][characterTypesAll[generalType].length - 1]
        if (currentPokemonType === lastPokemonType) {
          return this
        } else {
          let nextTypeIndex = [characterTypesAll[generalType].indexOf(currentPokemonType) + 1]
          let nextType = characterTypesAll[generalType][nextTypeIndex]
          let nextSpecieIndex = [characterTypesAll[generalType].indexOf(currentPokemonType) + 1]
          let nextSpecies = characterSpeciesAll[generalType][nextSpecieIndex]
          
          return this.setPokemonType(nextType, nextSpecies)
          
        }
      }
    }
  }
}
Character.prototype.attack = function(defender) {
  let checkerIfAlive = defender.checkIfAlive()
  if (checkerIfAlive !== 'alive') {
    return checkerIfAlive
  }

  let damage = this.getAttackPoints()
  defender.setHealthPoints(defender.getHealthPoints() - damage)
  let defenderState = defender.checkIfAlive()
  if (defenderState === 'alive') {
    return `${this.name} uses a basic attack and deals ${damage} damage to ${defender.name}`
  } else {
    this.workWithExperience()//attacker gets a point for a victory
    return defenderState
  }
}
Character.prototype.checkIfAlive = function() {
  if (this.getHealthPoints() <= 0) {
    return `Victory! ${this.name} is defeated`
  } else {
    return 'alive'
  }
}
Character.prototype.workWithExperience = function(newAmount) {
  if (!newAmount) { // adding points when a character wins
    this.setExperience(this.getExperience() + 1)
    this.setAttackPoints(this.getAttackPoints() + 2)
    this.setHealthPoints(this.getAttackPoints() + 20)
  } else { //reseting when a character evolves
    this.setExperience(newAmount)
  }
  
  if (this.getExperience() === 50) { //when a character reaches 50 points in experience, they evolve
    this.evolve()
  }
}


function Charmander(name) {
  let healthMultiplier = 1
  let attackMultiplier = 1
  Character.call(this, 'Fire', 'lizard pokemon', 'charmander', name, healthMultiplier, attackMultiplier)
}
Charmander.prototype = Object.create(Character.prototype)
Charmander.prototype.constructor = Charmander

function Charmeleon(name) {
  let healthMultiplier = 3
  let attackMultiplier = 2
  Character.call(this, 'Fire', 'flame pokemon', 'charmeleon', name, healthMultiplier, attackMultiplier)
}
Charmeleon.prototype = Object.create(Character.prototype)
Charmeleon.prototype.constructor = Charmeleon
Charmeleon.prototype.applySpecialAttack = function(defender) {
  let checkerIfAlive = defender.checkIfAlive()
  if (checkerIfAlive !== 'alive') {
    return checkerIfAlive
  }

  let damage = this.getAttackPoints()*2
  defender.setHealthPoints(defender.getHealthPoints() - damage)

  let defenderState = defender.checkIfAlive()
  if (defenderState === 'alive') {
    return `${this.name} uses Fire and deals ${damage} damage to ${defender.name}`
  } else {
    this.workWithExperience()
    return defenderState
  }
}

function Charizard(name) {
  let healthMultiplier = 5
  let attackMultiplier = 3
  Character.call(this, 'Fire', 'flame pokemon', 'charizard', name, healthMultiplier, attackMultiplier)
}
Charizard.prototype = Object.create(Character.prototype)
Charizard.prototype.constructor = Charizard
Charizard.prototype.applySpecialAttack = function(defender) {
  let checkerIfAlive = defender.checkIfAlive()
  if (checkerIfAlive !== 'alive') {
    return checkerIfAlive
  }

  let damage = this.getAttackPoints()*3;
  defender.setHealthPoints(defender.getHealthPoints() - damage)

  let defenderState = defender.checkIfAlive()
  if (defenderState === 'alive') {
    return `${this.name} uses Burn Out and deals ${damage} damage to ${defender.name}`
  } else {
    this.workWithExperience()
    return defenderState
  }
}

function Pichu(name) {
  let healthMultiplier = 1
  let attackMultiplier = 1.5
  Character.call(this, 'Electric', 'mouse pokemon', 'pichu', name, healthMultiplier, attackMultiplier)
}
Pichu.prototype = Object.create(Character.prototype)
Pichu.prototype.constructor = Pichu

function Pikachu(name) {
  let healthMultiplier = 2
  let attackMultiplier = 3
  Character.call(this, 'Electric', 'mouse pokemon', 'pikachu', name, healthMultiplier, attackMultiplier)
}
Pikachu.prototype = Object.create(Character.prototype)
Pikachu.prototype.constructor = Pikachu
Pikachu.prototype.applySpecialAttack = function(defender) { //damage over time
  let checkerIfAlive = defender.checkIfAlive()
  if (checkerIfAlive !== 'alive') {
    return checkerIfAlive
  }

  let damage = this.getAttackPoints()*0.5;

  console.log(`${this.name} applies Shock to ${defender.name}`)

  function dealDamage() {
    defender.setHealthPoints(defender.getHealthPoints() - damage)
    console.log(`${this.name} ${this.name} ${this.name} deals ${damage} energy damage to ${defender.name}`)
  }

  function wait(ms) { //could use setInterval, but needed synchronuos
    let start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
  }

  let i = 0
  while (i < 3) {
    i++

    dealDamage()
    
    let defenderState = defender.checkIfAlive()
    if (defenderState !== 'alive') {
      this.workWithExperience()
      return defenderState
    }
    wait(1000)
  }
}

function Raichu(name) {
  let healthMultiplier = 3
  let attackMultiplier = 5
  Character.call(this, 'Electric', 'mouse pokemon', 'raichu', name, healthMultiplier, attackMultiplier)
}
Raichu.prototype = Object.create(Character.prototype)
Raichu.prototype.constructor = Raichu
Raichu.prototype.applySpecialAttack = function(defender) {
  let checkerIfAlive = defender.checkIfAlive()
  if (checkerIfAlive !== 'alive') {
    return checkerIfAlive
  }

  let damage = this.getAttackPoints()*3;
  defender.setHealthPoints(defender.getHealthPoints() - damage)

  let defenderState = defender.checkIfAlive()
  if (defenderState === 'alive') {
    return `${this.name} strikes with The Mighty Lightning and deals ${damage} damage to ${defender.name}!`
  } else {
    this.workWithExperience()
    return defenderState
  }
}

//function that automatically conducts a fight (the work will be shown further)
function battle(fighter1, fighter2) {
  function atteptHit(attacker, defender) {
    let random = Math.floor(Math.random() * Math.floor(100));
    let missedMes = `Ooops, ${attacker.name} missed`

    if(random < 25) {
      return missedMes
    } else if (random >= 25 && !attacker.applySpecialAttack) {
      return attacker.attack(defender)
    } else if (random >= 25 && random <= 80) {
      return attacker.attack(defender)
    } else if (random > 80) {
      return attacker.applySpecialAttack(defender)
    }
  }

  while (fighter1.getHealthPoints() > 0 && fighter2.getHealthPoints() > 0) {
    
    console.log(atteptHit(fighter1, fighter2))

    if (fighter2.getHealthPoints() > 0) {
      console.log(atteptHit(fighter2, fighter1))
    }
    
  }
}


// OBLIGATORY CHECKING 
/* const charmander = new Charmander();
const charmeleon = new Charmeleon();
const charizard = new Charizard();

console.log(charmander.getType()); // -> “Fire”
console.log(charmander.getType() === charmeleon.getType()); // -> true
console.log(charmeleon.getType() === charizard.getType()); // -> true

console.log(charmander.evolve().constructor === Charmeleon); // -> true
console.log(charmeleon.evolve().constructor === Charizard); // -> true

console.log(charmander.getSpecie()); // -> “Lizard Pokémon” - gets advanced after calling evolve to "flame pokemon"
console.log(charmeleon.getSpecie()); // -> “Flame Pokémon”
console.log(charizard.getSpecie() === charmeleon.getSpecie()); // -> true

console.log(charmander.canFly()); // -> false
console.log(charmander.canFly() === charmeleon.canFly()); // -> true// will become false after charmeleon evolving
console.log(charizard.canFly()); // -> true 

const pichu = new Pichu();
console.log(pichu.getPokemonType()); // => Pichu

const pikachu = pichu.evolve();
console.log(pikachu.getPokemonType()); // Pikachu
console.log(pikachu.constructor === Pikachu); // true

const raichu = pikachu.evolve();
console.log(raichu.getPokemonType()); // Raichu
console.log(raichu.constructor === Raichu); // true

const raichu2 = raichu.evolve(); // return raichu back as it's maximum level
console.log(raichu2 === raichu); // true */


//SOME OF MY FEATURES (COMMENT THE PREVIOUS CHECKINGS)
//1. all characters have a basic attack (metod inherited from Character.prototype)

/* let someCharmander = new Charmander('charmy')
let somePichu = new Pichu('pichu')
console.log(somePichu.attack(someCharmander)) */


//2. 2nd- and 3rd-level characters have a basic attack and a unique special attack written in their prototype

/* let someCharmeleon = new Charmeleon('charlie')
let somePikachu = new Pikachu('pika')
console.log(somePikachu.applySpecialAttack(someCharmeleon))//this special attack has damage over time */


/*3. first level characters don't have any special attacks, but if they win a battle,
 they get a point of experience.When a character gets 50 experience, they automatically evolve*/

/* //someCharmander.applySpecialAttack(somePikachu)// throws an error
someCharmander.workWithExperience(50)
console.log(someCharmander.applySpecialAttack(somePikachu))// "charmy uses Fire and deals 20 damage to pika" */

//AUTOMATED BATTLE (COMMENT THE PREVIOUS CHECKINGS)
/* const me = new Pikachu('Oleh')
const him = new Charmeleon('The Beast')
battle(me, him) */