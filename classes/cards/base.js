class card {
	assets = {}
}

class unit extends card {
	type = "unit"
	stats = {}
	actions = {}
	cost = {}
	adv = {}
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
		stats.spd = 2
		stats.stm = 3
		stats.slt = 4
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
		adv.strong = ["blunt","sharp","poison","radiation"];
		adv.weak = ["dark","strange"];
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

