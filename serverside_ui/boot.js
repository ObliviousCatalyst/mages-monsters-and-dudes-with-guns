document.getElementById("form").addEventListener("submit", () => {
	console.log("submission recieved")
	window.signal.start(document.getElementById("port-input").value)
})

//const input = document.getElementById("port-input")
//const button = document.getElementById("start-button")

// button.onclick = () => {
// 	console.log(input.value)
// 	web.launchServer(input.value)
// }
