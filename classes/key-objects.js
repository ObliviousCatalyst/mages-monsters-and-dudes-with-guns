import * as user from "./users.js"

export class staticArray {
	constructor(depth) {
		for(let pt = 0; pt < depth -1; pt++) {
			this[pt] = undefined;
		}
	}
}

export class staticMatrix {
	constructor(x,y) {
		for(let pt = 0; pt < x -1; pt++) {
			this[pt] = new staticArray(y);
		}
	}
}

export class deck {
	constructor(json,team,type) {
		this.team = team
		this.type = type
		this.array = json[type].array
		this.shuffle()
	}

	shuffle() {
		let mem = this.array;
		this.array = [];
		while(mem.length > 0) {
			let pt = Math.floor(Math.random()*mem.length)
			this.array.push(mem[pt])
			mem[pt] = undefined;
			for(let pt1 = pt; pt1 < mem.length; pt1++) {
				mem[pt1] = mem[pt1+1]
			}
			mem.pop()
		}
		console.log(`${this.team}'s ${this.type} deck was shuffled`)
	}
}

class hand {
	constructor() {
		this.contents = [];
	}

	draw() {

	}
}

export class userlist {
	constructor() {
		this.spectators = []
		this.players = {red,blue}
	}

	addSpectator(username,ip) {
		this.spectators.push(new user.spectator(username,ip))
	}

	addPlayer(username,ip,team){
		this.players[team] = new user.player(username,ip)
	}

	addHost(username) {
		this.host = new user.host(username)
	}
}

// const board = new staticMatrix(9,9)
// console.log(board)
// redDeck = new deck()
