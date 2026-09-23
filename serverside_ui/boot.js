document.getElementById("start-button").addEventListener("click", () => {
	console.log("submission recieved")
	window.signal.start(document.getElementById("port-input").value)
	window.location = "control pannel.html"
})
