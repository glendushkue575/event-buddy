/* 
   Filename: ComplexCode.js
   Description: This code is a complex implementation of a text-based adventure game where the user can navigate through multiple locations, interact with non-player characters, solve puzzles, and collect items. It simulates a rich and immersive experience with dynamic storytelling.

   Note: This code is a simplified version for demonstration purposes, and would require additional development and assets for a complete game.
*/

// Game class represents the main game engine
class Game {
  constructor() {
    this.currentLocation = 'start';
    this.gameOver = false;
    this.inventory = [];
  }

  start() {
    this.gameOver = false;
    this.printCurrentLocation();
  }

  printCurrentLocation() {
    console.log(`You are currently in ${locations[this.currentLocation].name}`);
    console.log(locations[this.currentLocation].description);

    if (locations[this.currentLocation].items.length > 0) {
      console.log(`You see ${locations[this.currentLocation].items.join(', ')} lying around.`);
    }

    if (locations[this.currentLocation].npcs.length > 0) {
      console.log(`You notice ${locations[this.currentLocation].npcs.join(', ')} nearby.`);
    }
  }

  printInventory() {
    if (this.inventory.length === 0) {
      console.log('Your inventory is empty');
    } else {
      console.log('You are currently carrying:');
      console.log(this.inventory.join(', '));
    }
  }

  takeItem(item) {
    const items = locations[this.currentLocation].items;

    if (items.includes(item)) {
      this.inventory.push(item);
      items.splice(items.indexOf(item), 1);
      console.log(`You have taken the ${item}`);
    } else {
      console.log(`There is no ${item} here`);
    }
  }

  dropItem(item) {
    const items = locations[this.currentLocation].items;

    if (this.inventory.includes(item)) {
      this.inventory.splice(this.inventory.indexOf(item), 1);
      items.push(item);
      console.log(`You have dropped the ${item}`);
    } else {
      console.log(`You don't have a ${item}`);
    }
  }

  talkToNpc(npc) {
    if (locations[this.currentLocation].npcs.includes(npc)) {
      if (npc === 'old man') {
        console.log('Old Man: Welcome, young adventurer! To proceed, you need to solve a riddle.');
        console.log('Old Man: What can be seen once in a minute, twice in a moment, but never in a thousand years?');
      } else {
        console.log(`The ${npc} ignores you`);
      }
    } else {
      console.log(`There is no ${npc} here`);
    }
  }

  solveRiddle(answer) {
    if (answer.toLowerCase() === 'm') {
      console.log('Old Man: Well done! You may proceed.');
      this.currentLocation = 'dungeon';
      this.printCurrentLocation();
    } else {
      console.log('Old Man: That is incorrect. Try again!');
    }
  }

  move(direction) {
    const nextLocation = locations[this.currentLocation].exits[direction];

    if (!nextLocation) {
      console.log("You can't go that way");
    } else {
      this.currentLocation = nextLocation;
      this.printCurrentLocation();
    }
  }

  quit() {
    this.gameOver = true;
    console.log('Thanks for playing!');
  }

  parseInput(input) {
    const [command, arg] = input.split(' ');

    switch (command) {
      case 'go':
        this.move(arg);
        break;
      case 'take':
        this.takeItem(arg);
        break;
      case 'drop':
        this.dropItem(arg);
        break;
      case 'talk':
        this.talkToNpc(arg);
        break;
      case 'solve':
        this.solveRiddle(arg);
        break;
      case 'inventory':
        this.printInventory();
        break;
      case 'quit':
        this.quit();
        break;
      default:
        console.log("I don't understand");
    }
  }

  run() {
    this.start();

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.on('line', (input) => {
      this.parseInput(input);
      if (this.gameOver) {
        readline.close();
      }
    });
  }
}

// Locations database
const locations = {
  start: {
    name: 'Starting Point',
    description: 'You find yourself in a dimly lit room. There are doors to the north and east.',
    items: ['key', 'torch'],
    npcs: [],
    exits: {
      north: 'garden',
      east: 'corridor',
    },
  },
  garden: {
    name: 'Enchanted Garden',
    description: 'You stand in a beautiful enchanted garden, bathed in moonlight. There is a door to the south.',
    items: ['ring', 'flowers'],
    npcs: ['butterfly'],
    exits: {
      south: 'start',
    },
  },
  corridor: {
    name: 'Creepy Corridor',
    description: 'You enter a dark and creepy corridor. There are doors to the west and east.',
    items: ['sword', 'painting'],
    npcs: [],
    exits: {
      west: 'start',
      east: 'dungeon',
    },
  },
  dungeon: {
    name: 'Dungeon',
    description: 'You are trapped in a cold dungeon. There is a door to the west.',
    items: ['chest'],
    npcs: ['old man'],
    exits: {
      west: 'corridor',
    },
  },
};

// Start the game
const myGame = new Game();
myGame.run();