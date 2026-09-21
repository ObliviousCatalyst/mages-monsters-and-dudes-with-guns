export class card {
	assets = {}
}


export class unit extends card {
	/**
	 * @type {Object}
	 * @property {number} hp
	 * @property {number} atk
	*/
	stats = {
		//hp,
		//atk,
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

export class action extends card {
	
}

export class item extends card {
	
}

export class orbit extends card {
	
}

