let board = document.getElementById("board-inner")
let boardHTML = await fetch("./grid.html")
console.log(boardHTML)
board.innerHTML = boardHTML