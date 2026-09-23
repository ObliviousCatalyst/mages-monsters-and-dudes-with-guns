import * as user from "./users.js"
import * as cards from "./cards.js"
import {} from "./pointers.js"
import { item } from "./cards/base.js"

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

	/**
	 * check a location on the board for it's contents
	 * @param {...number} pos 
	 */
	checkPoint (...pos) {
		pos.forEach(i => {
			if (!Number.isInteger(i)) throw new TypeError("all arguments of checkPoint must be integers")
		})
		return this[pos[0]][pos[1]]
	}

	/**
	 * create an new pointer at selected point
	 * @param {number} reference 
	 * @param {...number} position 
	 */
	createPointer (reference,...position) {
		// initial checks
		let TErr = new TypeError("all argumets of createPointer() must be integers")
		if (!Number.isInteger(reference)) throw TErr
		position.forEach(item => {
			if (!Number.isInteger(item)) throw TErr
		})
	}

	/**
	 * move a pointer to another location in this board
	 * @param {number[]} target 
	 * @param {number[]} destination 
	 */
	movePointer (target,destination) {
		// initial checks
		let TErr = new TypeError("all parameters of movePointer() must be arrays of integers")
		if (typeof target !== "object" || typeof destination !== "object") throw TErr
		if (!Array.isArray(target) || !Array.isArray(destination)) throw TErr
		[target[0],target[1],destination[0],destination[1]].array.forEach(element => {
			if (typeof element !== "number") throw TErr
			if (!Number.isInteger(element)) throw TErr
		});
	
		// main logic
		this[destination[0]][destination[1]] = this[target[0]][target[1]]
		this[target[0]][target[1]] = undefined
	}

	/**
	 * transfer a pointer to another object
	 * @param {[number, number]} target 
	 * @param {[object, ...]} destination 
	 */
	transferPointer (target, destination) {
		// inital checks
		let TErr = new TypeError("parameters of transfer pointer must be arrays")
		if (typeof target !== "object" || typeof destination !== "object") throw TErr
		if (!Array.isArray(target) || !Array.isArray(destination)) throw TErr
		target.forEach(item => {
			let err = new TypeError("target must be an array of integers")
			if (typeof item !== "number") throw err
			if (!Number.isInteger(item)) throw err
		})
		if (typeof destination[0] !== "object") throw new TypeError("destination[0] must be an object/array")
		
		// main logic

	}

	/**
	 * transfer pointer form another object
	 * @param {[object, ...]} target 
	 * @param {[number, number]} destination
	 */
	transferPointerFrom (target,destination) {

	}
}

export class entityList {
	units = []
	orbitals = []

	/**
	 * 
	 * @param {cards.base.unit} k 
	 */
	spawnUnit () {

	}

	spawnOrbital () {

	}

	spawn
}