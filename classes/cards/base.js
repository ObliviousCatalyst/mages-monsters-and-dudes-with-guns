class card {
	assets = {}
}

class unit extends card {
	type = "unit"
	stats = {
		hp,
		atk,
		alt,
		speed,
		stamina,
		slots,
	}
	actions = {}
	cost = {
		food,
		metal,
		mana,
	}
	advantage = {
		strong,
		weak,
	}
}

class gordon extends unit {	
	constructor () {
		// types
		size = "macro";
		tier = "A";
		faction = "black mesa";

		// stats
		stats.hp = 200
		stats.atk = 80
		stats.alt = 0
		stats.speed = 2
		stats.stamina = 3
		stats.slots = 4
		cost.food = 2
		cost.equip = "crowbar"

		// assets
		assets.image
		assets.icon

		// advanced
		actions.kick = {
			range: 1,
			types: {
				"blunt": "atk",
			}
		};
		advantage.strong = ["blunt","sharp","poison","radiation"];
		advantage.weak = ["dark","strange"];
	}
		
	effect() {
		// blank
	}
	kick() {
		
	}
	
}

class action extends card {
	
}

class item extends card {
	
}

class orbit extends card {
	
}

