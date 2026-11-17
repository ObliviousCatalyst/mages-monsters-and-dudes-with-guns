import { entityPointer } from "../pointers.js"
/**
 * @class
 */
export abstract class Card {
	name: string | null = null
	assets = new class Assets {
		[key: string]: string
	}
	reference: entityPointer | null = null

	assignRef (ptr: entityPointer) {
		if (this.reference = null) {
			this.reference = ptr
			return
		}

	}
}

export interface UnitStats {
	hp: number
	atk: number
	alt: number
	speed: number
	stamina: number
	slots: number
}

export interface UnitCost {
	food?: number
	metal?: number
	mana?: number
}

/**
 * minimal unit base
 * @class
 * @extends {Card}
 */
export class Unit extends Card {
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
	stats: UnitStats = {
		hp: 100,
		atk: 20,
		alt: 20,
		speed: 0,
		stamina: 10,
		slots: 2,
	}
	actions: UnitAction[] = []
	cost: UnitCost = {
		food: 1,
		metal: 1,
		mana: 1,
	}
	advantage = {
		strong: [],
		weak: [],
	}
	faction: string = "none"
}

/**
 * standard unit base
 * @class 
 * @extends {Unit}
 */
export class StdUnit extends Unit {
	constructor () {
		super()
		this.actions.push(new UnitAction("move","move this unit", {
			target: "none", 
			category: "mobility",
			movement: "standard", 
			movementDist: "speed",
		}, (x: number, y: number) => {
			// reminder to run checks to limit player movement
			this.reference?.move(x,y)	
		}))
	}
}

export class ActionCard extends Card {
	
}

export class Item extends Card {
	
}

export class Orbital extends Card {
	
}

export interface UnitActionMeta {
	target: "none" | "self" | "ally" | "opponent" | "allyOrbit" | "oppOrbit" | "allyStasis" | "oppStasis" | "tile" | "world"
	category: "mobility" | "attack" | "support" | "other"
	movement?: "none" | "standard" | "linear" | "rush" | "recoil" | "teleport"
	movementDist?: "speed" | "implicit" | number
	power?: number
	damageSrc?: "atk" | "alt" | "fixed"
	damageTypePrime?: "neutral" | "blunt" | "slashing" | "piercing" | "blast" | "energy" | "arcana"
	damageTypeSec?: "neutral" | "heat" | "cold" | "water" | "electric" | "psychic" | "rads"
}

/**
 * an action that a unit can take to affect themselves, another unit, or the world
 * @class
 */
export class UnitAction {
	name: string
	description: string
	meta: UnitActionMeta
	method: Function
	
	/**
	 * create a new unit action
	 * @param {string} name 
	 * @param {string} description 
	 * @param {unitActionMeta} meta
	 * @param {function (...): void} method  
	 */
	constructor (name: string, description: string, meta: UnitActionMeta, method: Function) {
		this.name = name
		this.description = description
		this.meta = meta
		this.method = method
	}
}