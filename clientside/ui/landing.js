let form = document.getElementById("form-div")

form.addEventListener("submit", () => {
	fetch(`/createUser/${form.children[1].value}/${form.children[3].value}`).then()
})