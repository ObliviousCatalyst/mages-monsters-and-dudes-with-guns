class card {
	constructor(){
		
	}
}

class unit extends card {
	constructor(){
		this.type = "unit";
		this.stats = {};
		this.actions = {};
		this.cost = {};
		this.adv = {}; 
	}
}

class gordon extends unit {
	constructor() {
		super();
		this.size = "macro";
		this.tier = "A";
		this.faction = "black mesa";
		this.stats.hp = 200;
		this.stats.atk = 80;
		this.stats.alt = 0;
		this.stats.spd = 2;
		this.stats.stm = 3;
		this.stats.slt = 4;
		this.cost.food = 2;
		this.cost.equip = "crowbar";
		this.assets.image;
		this.assets.icon;
		this.actions.kick = {
			range: 1,
			types: {
				"blunt": "atk",
			}
		};
		this.adv.strong = ["blunt","sharp","poison","radiation"];
		this.adv.weak = ["dark","strange"];
		
	}
	effect() {
		// blank
	}
	kick() {
		
	}
	
}

class action extends card {
	constructor(){
		super()
		//this.icon = icon;
	}
}

class item extends card {
	constructor(){
		super()
	}
}

class orbit extends card {
	constructor(){
		super()
	}
}

