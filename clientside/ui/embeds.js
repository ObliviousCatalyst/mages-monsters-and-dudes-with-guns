async function getHtml (name) {
	let res = await fetch(name)
	let text = await res.text()
	return text
}

let chat = document.getElementById("chat")
let chatHtml = await getHtml("chat.html")
console.log(chatHtml)
chat.innerHTML = chatHtml