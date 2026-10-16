import path from "node:path"

import { BrowserWindow , app , ipcMain } from "electron"

import { launchServer } from "./servers.js"
import { globalUpdate } from "./constants.js"

const __dirname = import.meta.dirname

let win

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