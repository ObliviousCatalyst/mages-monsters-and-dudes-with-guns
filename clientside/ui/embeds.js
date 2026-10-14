async function getHtml (name) {
	let res = await fetch(name)
	let text = await res.text()
	return text
}

