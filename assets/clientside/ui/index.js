// critical scripts (or scripts that other scripts depend on) use static import
import "./global.js"
import "./embeds.js"
// non-critical scripts use dynamic import
import ("./grid.js")
import ("./chat.js")