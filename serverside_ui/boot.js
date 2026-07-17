document.getElementById("form").addEventListener("submit", () => {
	console.log("submission recieved")
	window.signal.start(document.getElementById("port-input").value)
})
