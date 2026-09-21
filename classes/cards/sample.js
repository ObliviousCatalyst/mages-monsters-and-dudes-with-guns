import { card, unit, action, item } from "./base.js"

export class gordon extends unit {
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
		this.assets.icon

		// advanced
		this.actions = {
			kick: {
				description: "",
				func () {
					
				}
			}
		};

		this.advantage.strong = ["blunt", "sharp", "poison", "radiation"]
		this.advantage.weak = ["dark", "strange"]
	}

	effect () {
		// blank
	}
}