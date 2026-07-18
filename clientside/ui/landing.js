//import { error } from "node:console"

let form = document.getElementById("user-create")

form.addEventListener("submit", (event) => {
	event.preventDefault()
	let v1 = form.children[0].children[1].value
	let v2 = form.children[0].children[3].value
	console.log(v1)
	console.log(v2)
	console.log(window.location)
	fetch(`/createUser/${v1}/${v2}`).then((res) => {
		console.log(res.status)
		if(res.status = 201) {
			window.location = "/main.html"
		}
		else {
			window.location = "/error.html"
		}
	})
})