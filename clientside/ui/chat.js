const input = document.getElementById("chat-input")
const sendButton = document.getElementById("send")
const chatDisp = document.getElementById("chat-log")
const sockets = {
	public: new WebSocket(`ws://${window.location.host}/public`)
}

function writeMessage(type, subtype, data, callback) {
	let temp = {
		type: type,
		subtype: subtype,
		data: data
	}
	if (typeof callback === "function") {
		callback()
	}
	return JSON.stringify(temp)
}

sockets.public.onmessage = (event) => {
	console.log(event.data)
	let data = event.data
	let msg = JSON.parse(data)
	switch(msg.type) {
		case "update":
			switch(msg.subtype) {
				case "chatlogs":
					console.log("updating chatlogs")
					let div = document.createElement("div") 
					for(let pt = 0; pt < msg.data.length; pt++) {
						console.log("begin loop")
						let temp = document.createElement("div")
						let temp1 = document.createElement("p")
						temp1.classList.add("username")

						let temp2 = document.createElement("p")
						temp2.classList.add("message")

						temp1.innerText = `${msg.data[pt][0]}:`
						temp2.innerText = msg.data[pt][1]
						temp1.style.marginRight = "2%";

						if(msg.data[pt][2]) {
							temp1.style.color = msg.data[pt][2]
						}

						console.log(temp1,temp2)
						temp.appendChild(temp1)
						temp.appendChild(temp2)
						console.log(temp)
						temp.classList.add("msg-cont")
						
						div.appendChild(temp)
					}
					div.classList.add("temp-chat-div")
					console.log(div)
					chatDisp.replaceChildren(div) 
				break;
			}
		break;
	}
}


sendButton.addEventListener("click", () => {
	console.log(input.value)
	let message = writeMessage("chat","message",input.value)
	sockets.public.send(message)
})