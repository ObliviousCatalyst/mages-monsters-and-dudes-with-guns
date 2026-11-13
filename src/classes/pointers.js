import { unit } from "./cards/base.js"
import { board } from "./key-objects.ts"

export class entityPointer {
	array
	index
	/**
	 * @type {unit}
	 */
	actualReference
	expectedX
	expectedY
	/**
	 * @param {board} board 
	 * @param {any[]} array 
	 * @param {number} index 
	 * @param {number} expectedX 
	 * @param {number} expectedY 
	 */
	constructor (board ,array, index, expectedX = null, expectedY = null) {
		this.array = array
		this.index = index
		this.expectedX = expectedX
		this.expectedY = expectedY
		this.actualReference = array[index]
	}
}