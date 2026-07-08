// IMPORTANT: preload scripts can only use CJS
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("signal",{
	start: (val) => {
		console.log("sending start request")
		ipcRenderer.send("start", val)
		console.log("request sent")
	}
})