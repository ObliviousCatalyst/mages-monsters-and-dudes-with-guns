import * as user from "./users.js"
import * as cards from "./cards.js"
import { entityPointer } from "./pointers.js"
import { orbital, unit } from "./cards/base.js"

type Constructor <T = any> = new (...args: any[]) => T

export class userlist {
	spectators: user.spectator[] = []
	players = new class { 
		[key: string]: user.player | null | undefined

		red: user.player | null = null
		blue: user.player | null = null
	}

	addSpectator (username: string, ip: string) {
		this.spectators.push(new user.spectator(username,ip))
	}

	addPlayer (username: string, ip: string, team: string) {
		this.players[team] = new user.player(username,ip)
	}
}

export class boardColumn {
	[key: number]: any
	length: number
	constructor (len: number) {
		this.length = len
	}
}

/**
 * @class
 * @property {number} width
 * @property {number} height
 */
export class board {
	[key: number]: boardColumn
	width: number
	height: number
	entities: entityList
	/**
	 * @param {number} width 
	 * @param {number} height 
	 */
	constructor (height: number = 1, width: number = 1, entList: entityList) {
		this.height = height
		this.width = width
		this.entities = entList
		
		for (let pt: number = 0; pt < height; pt++) {
			let column = new boardColumn(width) 
			for (let ix: number = 0; ix < width; ix++) {
				column[ix] = null
			}
			this[pt] = column
		}
	}

	/**
	 * check a location on the board for it's contents
	 * @param {...number} pos 
	 */
	checkPoint (...pos: [number, number]) {
		pos.forEach(i => {
			if (!Number.isInteger(i)) throw new TypeError("all arguments of checkPoint must be integers")
		})
		return this[pos[0]]![pos[1]]
	}

	/**
	 * move a pointer to another location in this board
	 * @param {number[]} target 
	 * @param {number[]} destination 
	 */
	movePointer (target: [number, number], destination: [number, number]) {
		// initial checks
		let TErr = new TypeError("all parameters of movePointer() must be arrays of integers"); // loadbearing semicolon, DO NOT REMOVE
		
		[target[0],target[1],destination[0],destination[1]].forEach(element => {
			if (!Number.isInteger(element)) throw TErr
		})
	
		// main logic
		this[destination[0]]![destination[1]] = this[target[0]]![target[1]]
		this[target[0]]![target[1]] = null
	}

	/**
	 * search for a pointer within self
	 * @param {entityPointer} ptr 
	 */
	searchForPointer (ptr: entityPointer) : [number, number] | null {
		for (let pt = 0; pt < this.width; pt++) {
			for (let ix = 0; ix < this[pt]![ix]; ix++) {
				if (this[pt]![ix] === ptr) {
					return this[pt]![ix]
				}
			}
		}
		return null
	}

	/**
	 * add a unit to the board
	 */
	addUnit (x: number, y: number, source: Constructor, args: any[]) {
		this[x]![y] = this.entities.spawnUnit(this, source, x, y, args)
	}

	/**
	 * move a unit
	 * @param {entityPointer} obj 
	 * @param  {...number} destination 
	 */
	moveUnit (obj: entityPointer, ...destination: [number, number]) {
		if (this[obj.expectedX]![obj.expectedY] !== obj) {
			let corrected = this.searchForPointer(obj)
			if (corrected === null) throw new Error("could not find pointer")
			obj.expectedX = corrected[0]
			obj.expectedY = corrected[1]
		}

	}
}

export class entityList {
	units: unit[] = []
	orbitals: orbital[] = []

	/**
	 * create a unit and return a pointer to that unit's position in the entity list 
	 * @param {cards.base.unit} source 
	 * @param {...*} args 
	 * @returns {entityPointer}
	 */
	spawnUnit (board: board, source: Constructor, x: number, y: number, ...args: any[]) : entityPointer {
		if (!(source.prototype instanceof cards.base.unit)) throw new TypeError("param source of spawnUnit() must be a class that inherits from cards.base.unit")
		let index = this.units.push(new source(...args))
		index--
		return new entityPointer(board, this.units, index, x, y)
	}

	/**
	 * create an orbital and return a pointer to that orbital's position in the entity list 
	 * @param {cards.base.orbit} source 
	 * @param {...*} args 
	 * @returns {entityPointer}
	 */
	spawnOrbital (board: board, source: Constructor, ...args: any[]): entityPointer {
		if (!(source.prototype instanceof cards.base.orbital)) throw new TypeError("param source of spawnUnit() must be a class that inherits from cards.base.orbit")
		let index = this.orbitals.push(new source(...args))
		index--
		return new entityPointer(board, this.orbitals, index, 0,0)
	}
}