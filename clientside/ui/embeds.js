async function getHtml (name) {
	res = await fetch(name)
	text = await res.text()
	return text
}

let board = document.getElementById("board-inner")
let boardHTML = await getHtml("./grid.html")
console.log(boardHTML)
board.innerHTML = boardHTML