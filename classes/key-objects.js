import * as user from "./users.js"

// export class staticArray {
// 	constructor(depth) {
// 		for(let pt = 0; pt < depth -1; pt++) {
// 			this[pt] = undefined;
// 		}
// 	}
// }

// export class staticMatrix {
// 	constructor(x,y) {
// 		for(let pt = 0; pt < x -1; pt++) {
// 			this[pt] = new staticArray(y);
// 		}
// 	}
// }

// export class deck {
// 	constructor(json,team,type) {
// 		this.array = json[type].array
// 		this.shuffle()
// 	}

// 	shuffle() {
// 		let mem = this.array;
// 		this.array = [];
// 		while(mem.length > 0) {
// 			let pt = Math.floor(Math.random()*mem.length)
// 			this.array.push(mem[pt])
// 			mem[pt] = undefined;
// 			for(let pt1 = pt; pt1 < mem.length; pt1++) {
// 				mem[pt1] = mem[pt1+1]
// 			}
// 			mem.pop()
// 		}
// 		console.log(`${this.team}'s ${this.type} deck was shuffled`)
// 	}
// }

// class hand {
// 	contents = [];

// 	draw() {

// 	}
// }

export class userlist {
	spectators = []
	players = { 
		red: {},
		blue: {},
	}

	addSpectator(username,ip) {
		this.spectators.push(new user.spectator(username,ip))
	}

	addPlayer(username,ip,team){
		this.players[team] = new user.player(username,ip)
	}
}

export class board {
	/**
	 * @param {number} width 
	 * @param {number} height 
	 */
	constructor(height = 1, width = 1) {
		let wip = {}
		wip.height = height
		wip.width = width
		for (let pt = 0; pt < height; pt++) {
			let row = { length: width } 
			for (let ix = 0; ix < width; ix++) {
				row[ix] = null
			}

			wip[pt] = new Proxy(row, {
				get (target, property, receiver) {
					let intProp = parseInt(property)
					if (intProp !== NaN) {
						if (intProp >= 0 && intProp < width) {
							return Reflect.get(target,property,receiver)
						}
						throw new RangeError("attempted to get item outside of board bounds")
					}
					return Reflect.get(target, property, receiver)
				},

				set (target, property, value, receiver) {
					return Reflect.set(target, property, value, receiver)
				}
			})
		}
		return new Proxy(wip, {
			get(target, property, receiver) {
				let intProp = parseInt(property)
				if (intProp !== NaN) {
					if (intProp >= 0 && intProp < height) {
						return Reflect.get(target, property, receiver)
					}
					throw new RangeError("attempted to get item outside of board bounds")
				}
				return Reflect.get(target, property, receiver)
			},

			set(target, property, value, receiver) {
				return Reflect.set(target, property, value, receiver)
			}
		})
	}
}

export class entityList {

}