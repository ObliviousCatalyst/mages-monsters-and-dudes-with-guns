class User {
	[key: string]: any
	username: string
	ip: string
	perms = {
		chat: true
	}
	constructor(username: string, ip: string){
		this.username = username
		this.ip = ip
	}
}

export class Spectator extends User {
	perms = {
		chat: true,
		fetch: ["public", "self"],
		commands: ["basic"]
	}
		
	constructor(username: string, ip: string){
		super(username,ip)
		
	}
}

export class Player extends User {
	perms = {
		chat: true,
		fetch: ["public", "self"],
		commands: ["basic","advanced"]
	}
	constructor(username: string, ip: string){
		super(username,ip);
		// this.status = {}
		// this.units = {}
		// this.hand = {}
		// this.deck = {}
	}
}
