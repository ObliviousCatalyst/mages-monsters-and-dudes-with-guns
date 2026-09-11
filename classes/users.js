class user {
	constructor(username,ip){
		this.username = username
		this.ip = ip
	}
}

export class spectator extends user {
	constructor(username,ip){
		super(username,ip)
		this.perms.fetch = ["public"]
		this.perms.commands = ["basic"]
		
	}
	
}

// remove this class when possible
export class host extends user {
	constructor(username,ip){
		super(username,ip);
	}
}

export class player extends user {
	constructor(username,ip){
		super(username,ip);
		this.status = {}
		this.units = {}
		this.hand = {}
		this.deck = {}
	}
}
