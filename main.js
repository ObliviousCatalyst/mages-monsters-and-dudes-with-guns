import { BrowserWindow , app , ipcMain } from 'electron'
import path from "node:path"
import { fork } from "node:child_process"

const __dirname = import.meta.dirname

const serverProcess = fork("./web.js")

let win
let server
let users

function createWindow() {
	win = new BrowserWindow({
		width: 1920, 
		height: 1080,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			contextIsolation: true,
			nodeIntegration: false
		}
	})
	win.loadFile("./serverside_ui/boot.html")
}

app.whenReady().then(() => createWindow())

ipcMain.on("start",(event,val) => {
	console.log("start")
	console.log(val)
	//server = web.launchServer(val)
	serverProcess.send(["start_server",val])
	
	//users.addHost("host")
})

serverProcess.on("message", (msg) => {
	
})