const input = document.getElementById("chat-input")
const sendButton = document.getElementById("send")
const chatDisp = document.getElementById("chat-log")
const sockets = {
	public: new WebSocket(`ws://${window.location.host}/public`)
}
let chatlogs
let chatCashe
console.log(sockets.public)

sockets.public.addEventListener("message", (event) => {
	let msg = JSON.parse(event.data)
	switch(msg.type) {
		case "update":
			switch(msg.subtype) {
				case "chatlogs":
					let div = document.createElement("div") 
					for(let pt = 0; pt > msg.data.length; pt++) {
						let temp = document.createElement("div")
						let temp1 = document.createElement("p")
						temp1.classList.add("username")
						let temp2 = document.createElement("p")
						temp2.classList.add("message")
						temp1.innerText = `${msg.data[pt][0]}:`
						temp2.innerText = msg.data[pt][1]
						temp.appendChild(temp1)
						temp.appendChild(temp2)
						div.appendChild(temp)
					}
					chatDisp.innerHTML = div
				break;
			}
		break;
	}
})


sendButton.addEventListener("click", () => {
	fetch(`/send/chatMessage/${input.value}`)
	console.log(input.value)
})

async function fetchChat() {
	let raw = await fetch("chat")
	let blob = await raw.blob()
	let text = await blob.text()
	console.log(text)
	return text
}

async function parseChat() {
	let text = await fetchChat()
	let chat = JSON.parse(text)
	console.log(chat)
	return chat
}

// function getChat() {
// 	parseChat().then(text => {
// 		console.log(text)
// 		console.log(chatCashe)
// 		if (text != chatCashe) {
// 			console.log("cashe does not match data")
// 			let elem = document.createElement("div")
// 			for (let pt = 0; pt < text.length; pt++) {
// 				let par = document.createElement("p")
// 				par.appendChild(document.createTextNode(`${text[pt][0]}: ${text[pt][1]}`))
// 				par.appendChild(document.createElement("br"))
// 				elem.appendChild(par)
// 			}
// 			chatDisp.innerHTML = elem
// 			chatCashe = text
// 		}
// 		requestAnimationFrame(getChat)
// 	})
// }
// requestAnimationFrame(getChat)