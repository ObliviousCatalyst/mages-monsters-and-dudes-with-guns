import http from "node:http";
import fs from "node:fs";
import url from "node:url";
import { json } from "node:stream/consumers";
import { WebSocketServer as wssv } from "ws";
//import EventEmitter from "node:events";
import * as keyClass from "./classes/key-objects.js"
//const signalar = new EventEmitter()

process.on("message", (msg) => {
	if(msg[0] == "start_server") {
		launchServer(msg[1])
	}
	//signalar.emit()
})

function launchServer (port) {
	const files = {
		main: {
			html: fs.readFileSync("./clientside/ui/main.html"),
			css: fs.readFileSync("./clientside/ui/main.css"),
		},
		grid: {
			html: fs.readFileSync("./clientside/ui/grid.html"),
			css: fs.readFileSync("./clientside/ui/grid.css"),
		},
		chat: {
			html: fs.readFileSync("./clientside/ui/chat.html"), 
			css: fs.readFileSync("./clientside/ui/chat.css"), 
			js: fs.readFileSync("./clientside/ui/chat.js")
		},
		orbit: {
			html: fs.readFileSync("./clientside/ui/orbit.html"),
			redCss: fs.readFileSync("./clientside/ui/redOrbit.css")
		},
		fonts: {
			firaCode: fs.readFileSync("./fonts/Fira_Code/FiraCode-VariableFont_wght.ttf")
		}
	}
	
	const IP = "127.0.0.1";
	const chatlogs = [["this is a username","this is the message"]]
	
	const users = new keyClass.userlist()

	const server = http.createServer();

	const sockets = {
		public: new wssv({ noServer: true }),
		red: new wssv({ noServer: true }),
		blue: new wssv({ noServer: true }),
	}
	
	function checkExistance(ip, username) {
		function checkProperty(key, value) {
			let playerEmpty = false
			let specEmpty = false
			if ([users.players.red, users.players.blue].every((input) => typeof input === "undefined")) { playerEmpty = true }
			if (users.spectators === []) { specEmpty = true }
			if (playerEmpty && specEmpty) {
				return false
			}
			if (value === users.players.red[key] || value === users.players.blue[key]) {
				return true
			}
			for (let pt = 0; pt < users.spectators; pt++) {
				if (value === users.spectators[pt][key]) {
					return true
				}
			}
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
	}

	server.on("request", async (req, res) => {
		
		let parsed = req.url.split("/")
		if (parsed[0] === "") {
			parsed.shift()
		}
		switch (parsed[0]) {
			case "":
				res.setHeader("Content-type", "text/html");
				res.write(files.main.html);
			break;

			case "grid.html":
				res.setHeader("Content-type", "text/html");
				res.write(files.grid.html);
			break;

			case "orbit.html":
				res.setHeader("Content-type", "text/html");
				res.write(files.orbit.html);
			break;

			case "chat.html":
				res.setHeader("Content-type", "text/html");
				res.write(files.chat.html);
			break;

			case "main.css":
				res.setHeader("Content-type", "text/css");
				res.write(files.main.css);
			break;

			case "grid.css":
				res.setHeader("Content-type", "text/css");
				res.write(files.grid.css);
			break;

			case "redOrbit.css":
				res.setHeader("Content-type", "text/css");
				res.write(files.orbit.redCss);

			break;

			case "chat.css":
				res.setHeader("Content-type", "text/css");
				res.write(files.chat.css);

			break;

			case "chat.js":
				res.setHeader("Content-type", "text/javascript")
				res.write(files.chat.js)
			break;

			break;

			case "fira_Code":
				res.setHeader("Content-type", "font/ttf")
				res.write(files.fonts.firaCode)
			break;

			case "createUser":
				if (checkExistance(req.socket.remoteAddress,parsed[1])) {
					res.statusCode = 403
					res.write("text/plain", "utf-8", "error: player object with specified properties already exists")
					break
				}
				users.addPlayer(parsed[1],req.socket.remoteAddress,parsed[2])
				res.statusCode = 201
				res.write("text/plain","utf-8","player object was created")
			break;
		}
		res.end()
	})

	// i know naming your variables a single letter is bad practice but i cannot be fucked to come up with actual names right now
	sockets.public.on("connection", (v,req) => {
		console.log("connected to public socket")
		function writeMessage(type, subtype, data) {
			let temp = {
				type: type,
				subtype: subtype,
				data: data
			}
			return JSON.stringify(temp)
		}
		
		let initChat = writeMessage("update", "chatlogs", chatlogs, () => console.log("generated chatlog update"))
		v.send(initChat)
		v.on("message", (msg) => {
			console.log(msg)
			let parsed = JSON.parse(msg)

			function echo() {
				v.send(writeMessage("echo","none",parsed))
			}

			switch(parsed.type) {
				case "chat":
					switch(parsed.subtype) {
						case "message":

						break
					}
				break;

				case "create user":
					process.send({
						type: "user req",
						subtype: "create",
						data: {
							ip: req.socket.remoteAddress
						}
						

					})
						
					
				break;
			}
		})
	})
	
	console.log(sockets)

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