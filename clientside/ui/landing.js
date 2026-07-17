import { error } from "node:console"

let form = document.getElementById("form-div")

form.addEventListener("submit", () => {
	fetch(`/createUser/${form.children[1].value}/${form.children[3].value}`).then((res) => {
		if(res.status = 201) {
			window.location = "/main.html"
		}
		else {
			window.location = "/error.html"
		}
	})
})