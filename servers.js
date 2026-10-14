import http from "node:http"
import fs from "node:fs"
import url from "node:url"

import { ipcMain } from "electron"
import { WebSocketServer as wssv } from "ws"

import path from "node:path"

import { 
	files, mimeTypes, IP, chatlogs, users,
	board, entities, globalUpdate, checkExistence,
	checkIP, systemMessage, spawnGordon
} from "./constants.js"

export const server = http.createServer();

export const sockets = {
	public: new wssv({ noServer: true }),
	red: new wssv({ noServer: true }),
	blue: new wssv({ noServer: true }),
}

/**
 * self explanatory
 * @param {number} port 
 */
export function launchServer (port) {
	/***** HTTP SERVER *****/
	/***/
	server.on("request", (req, res) => {
		let url = new URL(req.url, "http://0.0.0.0")
		console.log(url)

		let parsed = url.pathname.split("/")
		let keepOpen = false
		if (parsed[0] === "" && parsed.length > 1) {
			parsed.shift()
		}
		
		switch (parsed[0]) {
			case "":
				res.setHeader("Content-type", "text/html")
				res.write(files.landing.html)
			break

			case "error.html":
				res.setHeader("Content-type", "text/html")
				res.write(files.error.html)
			break
			
			case "main.html":
				if(checkExistence(req.socket.remoteAddress)) {
					res.setHeader("Content-type", "text/html")
					res.write(files.main.html)
				}
				else {
					res.statusCode = 403
				}
			break

			case "grid.html":
				res.setHeader("Content-type", "text/html")
				res.write(files.grid.html)
			break

			case "orbit.html":
				res.setHeader("Content-type", "text/html")
				res.write(files.orbit.html)
			break

			case "chat.html":
				res.setHeader("Content-type", "text/html")
				res.write(files.chat.html)
			break

			case "landing.css":
				res.setHeader("Content-type", "text/css")
				res.write(files.landing.css)
			break

			case "main.css":
				res.setHeader("Content-type", "text/css")
				res.write(files.main.css)
			break

			case "grid.css":
				res.setHeader("Content-type", "text/css")
				res.write(files.grid.css)
			break

			case "redOrbit.css":
				res.setHeader("Content-type", "text/css")
				res.write(files.orbit.redCss)
			break

			case "chat.css":
				res.setHeader("Content-type", "text/css")
				res.write(files.chat.css)
			break

			case "landing.js":
				res.setHeader("Content-type", "text/javascript")
				res.write(files.landing.js)
			break

			case "global.js": 
				res.setHeader("Content-type", "text/javascript")
				res.write(files.main.js)
			break

			case "embeds.js": 
				res.setHeader("Content-type", "text/javascript")
				res.write(files.main.embeds)
			break

			case "chat.js":
				res.setHeader("Content-type", "text/javascript")
				res.write(files.chat.js)
			break;

			case "fira_Code":
				res.setHeader("Content-type", "font/ttf")
				res.write(files.fonts.firaCode)
			break;

			case "createUser": {
				console.log("create user requested")

				function fail () {
					res.statusCode = 403
					console.log("requested to create a user that already exists")
				}

				if (checkExistence(req.socket.remoteAddress,parsed[1])) {
					console.log("1st")
					fail()
					break;
				}

				if(parsed[2] === "spectator") {
					console.log("adding spectator")
					users.addSpectator(parsed[1],req.socket.remoteAddress)
					
					console.log("users: ",users)
					console.log("spectators: ", users.spectators)
					for (let pt = 0; pt < users.spectators.length; pt++) console.log(`spectator[${pt}]`,users.spectators[pt])
					res.statusCode = 201
					break;
				}
				
				if (JSON.stringify(users.players[parsed[2]]) !== JSON.stringify({})) {
					console.log("3rd")
					fail()
					break;
				}

				console.log("case was not broken")
				
				users.addPlayer(parsed[1],req.socket.remoteAddress,parsed[2])
				res.statusCode = 201
				systemMessage(`user: "${parsed[1]}" joined the game`)
			}break;

			case "images":
				let imgPath = path.join(__dirname,url.pathname)
				if (!imgPath.startsWith(path.join(__dirname,"images"))) {
					res.statusCode = 403
					break
				}

				fs.access(imgPath, fs.constants.F_OK, (err) => {
					if (err) {
						res.statusCode = 404
						return
					}
					let extension = path.extname(imgPath)
					res.setHeader("Content-type", mimeTypes[extension])
					fs.createReadStream(imgPath).pipe(res)
				})
			break

			default: 
				res.statusCode = 404;
			break;
		}
		if (!keepOpen) res.end()
	})

	/***** WEBSOCKET HANDLER *****/
	/***/
	// i know naming your variables a single letter is bad practice but i cannot be fucked to come up with actual names right now
	sockets.public.on("connection", (v,req) => {
		console.log("connected to public socket")
		function writeMessage(type, subtype, data) {
			return JSON.stringify({
				type: type,
				subtype: subtype,
				data: data
			})
		}
		
		let initChat = writeMessage("update", "chatlogs", chatlogs, () => console.log("generated chatlog update"))
		v.send(initChat)
		
		globalUpdate.addListener("update-chat", () => {
			v.send(writeMessage("update", "chatlogs", chatlogs, () => console.log("generated chatlog update")))
		}) 

		globalUpdate.on("update-game", () => {
			v.send(writeMessage("update", "game-state", { board, entities }))
		}) 
			
		v.on("message", (msg) => {
			console.log(msg)
			let parsed = JSON.parse(msg)
			console.log(parsed)
			


			switch(parsed.type) {
				case "chat":
					switch(parsed.subtype) {
						case "message":
							let userid = checkIP(req.socket.remoteAddress)
							
							if(userid !== "none") {
								let usrArr = userid.split(":")
								if (usrArr[0] === "player") {
									chatlogs.push([users.players[usrArr[1]].username,parsed.data,usrArr[1]])
								}
								if (usrArr[0] === "spectator") {
									chatlogs.push([users.players[usrArr[1]].username, parsed.data])
								}
								globalUpdate.emit("update-chat")
							}
						break;
					}
				break;
			}
		})
	})

	server.on("upgrade", (req,sock,head) => {
		let { pathname } = url.parse(req.url)
		let path = pathname.split("/")
		switch(path[1]) {
			case "public":
				sockets.public.handleUpgrade(req,sock,head, (v) => {
					sockets.public.emit("connection", v, req)
				})
			break;

			default:
				console.error(`client requested a socket that does not exist: ${pathname}`)
				sock.destroy()
			break;
		}
	})

	server.listen(port, IP, () => {
		console.log("server running")
	});
}

process.on("message", (msg) => {
	if (msg[0] === "start_server") launchServer(msg[1])
	if (msg[0] === "spawn gordon") spawnGordon()
})