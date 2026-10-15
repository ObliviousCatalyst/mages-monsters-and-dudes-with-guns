// IMPORTANT: preload scripts can only use CJS
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("signal",{
	start: (val) => ipcRenderer.send("start", val),
	spawnGordon: () => ipcRenderer.send("spawnG")
})
