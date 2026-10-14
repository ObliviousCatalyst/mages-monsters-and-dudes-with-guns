import EventEmitter from "node:events"
import fs from "node:fs"

import * as keyClass from "./classes/key-objects.js"
import * as cards from "./classes/cards.js"

/***** SETUP *****/
/***/

// now realizing that using fs to import assets might come back to bite me in the ass
export const files = {
	html: {
		landing: fs.readFileSync("./clientside/ui/landing.html"),
		error: fs.readFileSync("./clientside/ui/error.html"),
		main: fs.readFileSync("./clientside/ui/main.html"),
		chat: fs.readFileSync("./clientside/ui/chat.html"),
		orbit: fs.readFileSync("./clientside/ui/orbit.html"),
	},
	css: {
		landing: fs.readFileSync("./clientside/ui/landing.css"),
		main: fs.readFileSync("./clientside/ui/main.css"),
		grid: fs.readFileSync("./clientside/ui/grid.css"),
		chat: fs.readFileSync("./clientside/ui/chat.css"),
		redOrbit: fs.readFileSync("./clientside/ui/redOrbit.css"),
	},
	js: {
		landing: fs.readFileSync("./clientside/ui/landing.js"),
		index: fs.readFileSync("./clientside/ui/index.js"),
		global: fs.readFileSync("./clientside/ui/global.js"),
		embeds: fs.readFileSync("./clientside/ui/embeds.js"),
		grid: fs.readFileSync("./clientside/ui/grid.js"),
		chat: fs.readFileSync("./clientside/ui/chat.js"),
	},
	fonts: {
		firaCode: fs.readFileSync("./fonts/Fira_Code/FiraCode-VariableFont_wght.ttf"),
	}
}

export const mimeTypes = {
	".html" : "text/html",
	".css" : "text/css",
	".js" : "text/javascript",
	".json" : "application/json",
	".png" : "image/png",
	".jpg" : "image/jpeg",
	".jpeg" : "image/jpeg",
	".svg" : "image/svg+xml"
}

export const IP = "0.0.0.0";
export const chatlogs = [["System", "server started", "yellow"]]

export const users = new keyClass.userlist()

export const board = new keyClass.board(7, 7)

export const entities = new keyClass.entityList()

/**
 * @class
 * @extends {EventEmitter}
 */
export const globalUpdate = new class extends EventEmitter {
	constructor() {
		super()
	}
}

/**
 * updates the current game state for clients
 * @event globalUpdate#game-update
 */

/**
 * updates the chat for clients
 * @event globalUpdate#chat-update
 */

/**
 * THIS IS TEMPORARY!
 * REMOVE THIS FUNCTION ASAP!
 * @emits globalUpdate#game-update
 */
export function spawnGordon () {
	board[5][5] = entities.spawnUnit(cards.gordon)
	globalUpdate.emit("game-update")
}



/***** IMPORTANT FUNCTIONS *****/
/**
 * check if a user exists by username/IP address
 * @param {string} ip 
 * @param {string} username 
 * @returns {boolean}
 */
export function checkExistence (ip, username) {
	function checkProperty (key, value) {
		let playerEmpty = false
		let specEmpty = false
		if ([users.players.red, users.players.blue].every((input) => typeof input === "undefined")) { 
			playerEmpty = true 
			console.log("set player empty")
		}
		if (users.spectators == []) { 
			specEmpty = true 
			console.log("set spec empty")
		}
		if (playerEmpty && specEmpty) {
			console.log("both empty")
			return false
		}
		if (value === users.players.red[key] || value === users.players.blue[key]) {
			console.log("match player")
			return true
		}
		console.log("spectator count:",users.spectators.length)
		for (let pt = 0; pt < users.spectators.length; pt++) {
			console.log(`checked spec ${pt}`)
			if (value === users.spectators[pt][key]) {
				console.log("match spec")
				return true
			}
		}
		console.log("match none")
		console.log("users:",users)
		return false
	}
	if (typeof username === "string") {
		if (checkProperty("username",username)) {
			return true
		}
	}
	if (checkProperty("ip",ip)) {
		return true
	}
	return false
}

/**
 * checks who an IP address belongs to (among active users)
 * @param {string} ip 
 * @returns {string}
 */
export function checkIP (ip) {
	if (ip === users.players.red.ip) {
		return "player:red"
	}
	if (ip === users.players.blue.ip) {
		return "player:blue"
	}
	for (let pt = 0; pt < users.spectators; pt++) {
		if (ip === users.spectators[pt].ip) {
			return `spectator:${pt}`
		}
	}
	return "none"
}

/**
 * sends a chat message from the system
 * @param {string} msg 
 * @emits globalUpdate#chat-update
 */
export function systemMessage (msg) {
	chatlogs.push(["System", msg, "yellow"])
	globalUpdate.emit("chat-update")
} 