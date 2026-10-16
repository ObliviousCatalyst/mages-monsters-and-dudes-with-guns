import { card, unit, action, item, StdUnit, unitAction } from "./base.js"

export class gordon extends StdUnit {
	constructor() {
		// types
		this.size = "macro"
		this.tier = "A"
		this.faction = "black mesa"

		// stats
		this.stats.hp = 200
		this.stats.atk = 80
		this.stats.alt = 0
		this.stats.speed = 2
		this.stats.stamina = 3
		this.stats.slots = 4
		this.cost.food = 2
		this.cost.equip = "crowbar"

		// assets
		this.assets.image
		this.assets.icon = "gordon.jpg"

		// advanced
		this.actions.push(new unitAction("kick", "self eplanetory", {
			target: "opponent",
			movement: "none",
			movementDist: "implicit",
			power: 2,
			damageSrc: "atk",
			damageTypePrime: "blunt",
			damageTypeSec: "neutral",
		}, () => {
			
		}))

		this.advantage.strong = ["blunt", "sharp", "poison", "rads"]
		this.advantage.weak = ["dark", "strange"]
	}

	effect () {
		// blank
	}
}