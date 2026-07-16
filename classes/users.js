class user {
	constructor(username,ip){
		this.username = username
		this.perms = {}
		this.perms.chat = true;
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

export class host extends user {
	constructor(username,ip){
		super(username,ip);
		this.perms.fetch = ["public","private","self","server"]
		this.perms.commands = ["basic","advanced","admin"]
	}
}

export class player extends user {
	constructor(username,ip){
		super(username,ip);
		this.perms.commands = ["basic","advanced"]
		this.perms.fetch = ["public","self"]
		this.status = {}
		this.units = {}
		this.hand = {}
		this.deck = {}
	}
}
