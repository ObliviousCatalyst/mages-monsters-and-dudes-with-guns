let upperDiv = document.getElementById("main-grid")
let divs = []
for(let pt = 0; pt < 81; pt++) {
	divs[pt] = document.createElement("div")
	divs[pt].classList.add("grid-space")
	let x = pt%9 + 1
	let y = Math.floor(pt/9) +1
	divs[pt].id = `${x}-${y}`
	upperDiv.append(divs[pt])
}