class user {
	constructor(username){
		this.username = username
		this.perms = {}
		this.perms.chat = true;
	}
}

export class spectator extends user {
	constructor(username){
		super(username)
		this.perms.fetch = ["public"]
		this.perms.commands = ["basic"]
		
	}
	
}

export class host extends user {
	constructor(username){
		super(username);
		this.perms.fetch = ["public","private","self","server"]
		this.perms.commands = ["basic","advanced","admin"]
	}
}

export class player extends user {
	constructor(username){
		super(username);
		this.perms.commands = ["basic","advanced"]
		this.perms.fetch = ["public","self"]
		this.status = {}
		this.units = {}
		this.hand = {}
		this.deck = {}
	}
}
