class user {
	perms = {
		chat: true
	}
	constructor(username,ip){
		this.username = username
		this.ip = ip
	}
}

export class spectator extends user {
	perms = {
		chat: true,
		fetch: ["public", "self"],
		commands: ["basic"]
	}
		
	constructor(username,ip){
		super(username,ip)
		
	}
}

export class player extends user {
	perms = {
		chat: true,
		fetch: ["public", "self"],
		commands: ["basic","advanced"]
	}
	constructor(username,ip){
		super(username,ip);
		this.status = {}
		this.units = {}
		this.hand = {}
		this.deck = {}
	}
}
