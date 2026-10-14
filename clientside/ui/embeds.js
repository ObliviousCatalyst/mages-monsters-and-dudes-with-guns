async function getHtml (name) {
	let res = await fetch(name)
	let text = await res.text()
	return text
}

let board = document.getElementById("board-inner")
let boardHTML = await getHtml("./grid.html")
console.log(boardHTML)
board.innerHTML = boardHTML