import http from "node:http";
import fs from "node:fs";
import url from "node:url";
import process from "node:process";
import { json } from "node:stream/consumers";
import { WebSocketServer as wssv } from "ws";

process.on("message", (msg) => {
	if(msg[0] == "start_server") {
		launchServer(msg[1])
	}
})

function launchServer (port) {
	const mainHtml = fs.readFileSync("./clientside/ui/main.html", (err,file) => {
		if (err) {
			throw err;
		}
		return file;
	});

	const gridHtml = fs.readFileSync("./clientside/ui/grid.html", (err, file) => {
		if (err) {
			throw err;
		}
		return file;
	});

	const orbitHtml = fs.readFileSync("./clientside/ui/orbit.html", (err, file) => {
		if (err) {
			throw err;
		}
		return file;
	});

	const chatHtml = fs.readFileSync("./clientside/ui/chat.html", (err, file) => {
		if (err) {
			throw err;
		}
		return file;
	});
	
	const mainCss = fs.readFileSync("./clientside/ui/main.css", (err, file) => {
		if (err) {
			throw err;
		}
		return file;
	});

	const gridCss = fs.readFileSync("./clientside/ui/grid.css", (err,file) => {
		if(err) {
			throw err;
		}
		return file;
	});

	const redOrbitCss = fs.readFileSync("./clientside/ui/redOrbit.css", (err, file) => {
		if (err) {
			throw err;
		}
		return file;
	});

	const chatCss = fs.readFileSync("./clientside/ui/chat.css", (err,file) => {
		if(err) {
			throw err;
		}
		return file;
	});

	const chatJs = fs.readFileSync("./clientside/ui/chat.js", (err, file) => {
		if (err) {
			throw err;
		}
		return file;
	});

	const firaCode = fs.readFileSync("./fonts/Fira_Code/FiraCode-VariableFont_wght.ttf", (err, file) => {
		if (err) {
			throw err;
		}
		return file;
	});

	const IP = "127.0.0.1";

	const chatlogs = [["this is a username","this is the message"]]

	const server = http.createServer();

	console.log(wssv)

	const sockets = {
		public: new wssv({ noServer: true }),
		red: new wssv({ noServer: true }),
		blue: new wssv({ noServer: true }),
	}
	
	sockets.public.handleUpgrade()

	server.on("request", (req, res) => {
		console.log(req.url)
		let parsed = req.url.split("/")
		console.log(parsed)
		if (parsed[0] === "") {
			parsed.shift()
		}
		switch (parsed[0]) {
			case "":
				res.setHeader("Content-type", "text/html");
				res.write(mainHtml);
				res.end()
			break;

			case "grid.html":
				res.setHeader("Content-type", "text/html");
				res.write(gridHtml);
				res.end()
			break;

			case "orbit.html":
				res.setHeader("Content-type", "text/html");
				res.write(orbitHtml);
				res.end()
			break;

			case "chat.html":
				res.setHeader("Content-type", "text/html");
				res.write(chatHtml);
				res.end()
			break;

			case "main.css":
				res.setHeader("Content-type", "text/css");
				res.write(mainCss);
				res.end()
			break;

			case "grid.css":
				res.setHeader("Content-type", "text/css");
				res.write(gridCss);
				res.end()
			break;

			case "redOrbit.css":
				res.setHeader("Content-type", "text/css");
				res.write(redOrbitCss);
				res.end()
			break;

			case "chat.css":
				res.setHeader("Content-type", "text/css");
				res.write(chatCss);
				res.end()
			break;

			case "chat.js":
				res.setHeader("Content-type", "text/javascript")
				res.write(chatJs)
				res.end()
			break;

			case "chat":
				if (req.socket.remoteAddress) {
					console.log(chatlogs)
					console.log(JSON.stringify(chatlogs))
					let data = JSON.stringify(chatlogs)
					res.setHeader("Content-type", "text/plain")
					res.write(data)
					res.end()
				}
			break;

			case "fira_Code":
				res.setHeader("Content-type", "font/ttf")
				res.write(firaCode)
				res.end()
			break;

			case "send":
				switch (parsed[1]) {
					case "chatMessage":
						chatlogs.push(parsed[2])
					break;
				}
				res.setHeader("Content-type", "text/plain")
				res.end("user output recieved")
			break;

			// case "sockets":
			// 	switch(parsed[1]) {
			// 		case "public":
			// 			sockets.public.handelUpgrade(req)
			// 		break;
			// 	}
			// break;
		}
		res.end()
	})

	// i know naming your variables a single letter is bad practice but i cannot be fucked to come up with actual names right now
	sockets.public.on("connection", (v) => {
		console.log("connected to public socket")
		function writeMessage(type, subtype, data, callback) {
			class outgoingMessage {
				constructor() {
					this.type = type
					this.subtype = subtype
					this.data = data
				}
			}
			let temp = new outgoingMessage
			if(typeof callback === "function") {
				callback()
			}
			return JSON.stringify(temp)
		}
		

		v.send(writeMessage("update", "chatlogs" ,chatlogs, () => console.log("generated chatlog update")))
		v.on("message", (msg) => {
			v.send(`echo: ${msg}`)
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