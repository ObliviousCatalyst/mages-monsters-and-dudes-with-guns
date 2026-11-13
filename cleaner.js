import fs from "node:fs"

let bindir = fs.readdirSync("bin")

for (let item of bindir) {
	fs.promises.rm(`./bin/${item}`, { force: true, recursive: true })
}