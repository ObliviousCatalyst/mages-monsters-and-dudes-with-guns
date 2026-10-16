/**
 * @class
 */
export class card {
	name
	assets = {}
}

/**
 * @class
 * @extends {card}
 */
export class unit extends card {
	/**
	 * @type {{
	 * hp: number 
	 * atk: number
	 * alt: number
	 * speed: number
	 * stamina: number
	 * slots: number
	 * }}
	*/
	stats = {
		hp: 100,
		atk: 20,
		alt: 20,
		speed: 0,
		stamina: 10,
		slots: 2,
	}
	actions = []
	cost = {
		food: 1,
		metal: 1,
		mana: 1,
	}
	advantage = {
		strong: [],
		weak: [],
	}
}

export class StdUnit extends unit {
	constructor () {
		this.actions.push(new unitAction("move","move this unit", {
			target: "none", 
			movement: "standard", 
			movementDist: "speed"
		}, () => {	
		}))
	}
}

export class actionCard extends card {
	
}

export class item extends card {
	
}

export class orbital extends card {
	
}
/**
 * an action that a unit can take to affect themselves, another unit, or the world
 * @class
 */
export class unitAction {
	name
	description
	method

	/**
	 * @typedef {object} unitActionMeta
	 * @property {"none" | "self" | "ally" | "opponent" | "allyOrbit" | "oppOrbit" | "allyStasis" | "oppStasis" | "tile" | "world"} target 
	 * @property {"mobility" | "attack" | "support" | "other"} category
	 * @property {"none" | "standard" | "linear" | "rush" | "recoil" | "teleport"} [movement]
	 * @property {"speed" | "implicit" | number} [movementDist]
	 * @property {number | "atk" | "alt"} [damage]
	 * @property {"neutral" | "blunt" | "slashing" | "piercing" | "blast" | "energy" | "arcana"} damageTypePrime
	 * @property {"heat" | "cold" | "water" | "electric" | "psychic" | "rads"} damageTypeSec
	 */

	/**
	 * create a new unit action
	 * @param {string} name 
	 * @param {string} description 
	 * @param {unitActionMeta} meta
	 * @param {function (...): void} method  
	 */
	constructor (name,description,meta,method) {
		this.name = name
		this.description = description
		this.meta = meta
		this.method = method
	}
}