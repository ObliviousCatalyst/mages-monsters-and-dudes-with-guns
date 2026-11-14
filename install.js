import { styleText } from "node:util"
import { exec, execSync } from "node:child_process"

function textGen (text) {
	return styleText(["white","bold"], text)
}

console.log(textGen("installing ws"))
execSync("npm install ws")
console.log(textGen("installing electron"))
execSync("npm install --save-dev electron")
execSync("npm install --global electron")
console.log(textGen("installing tsc"))
execSync("npm install --save-dev typescript")
execSync("npm install --global typescript")