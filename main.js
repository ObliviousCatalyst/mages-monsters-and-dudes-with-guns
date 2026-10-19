import path from "node:path"

import { BrowserWindow , app , ipcMain } from "electron"

import { launchServer } from "./servers.js"
import { globalUpdate, procArgs } from "./constants.js"

const __dirname = import.meta.dirname

let win

console.log(procArgs)

function createWindow () {
	win = new BrowserWindow({
		width: 1920, 
		height: 1080,
		webPreferences: {
			preload: path.join(__dirname, "preload.cjs"),
			contextIsolation: true,
			nodeIntegration: false
		}
	})
	let port = parseInt(procArgs.values.port)
	if (port !== NaN) {
		launchServer(port)
		win.loadFile("./serverside_ui/control panel.html")
		return
	}
	win.loadFile("./serverside_ui/boot.html")
}

app.whenReady().then(() => createWindow())

ipcMain.on("start", (event,val) => {
	launchServer(val)
	win.loadFile("./serverside_ui/control panel.html")
})

globalUpdate.on("chat-update",() => {
	console.log("chat update")
})