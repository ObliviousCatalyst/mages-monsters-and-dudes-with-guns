import { unit } from "./cards/base.js"

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
	 * @param {any[]} array 
	 * @param {number} index 
	 * @param {number} expectedX 
	 * @param {number} expectedY 
	 */
	constructor (array, index, expectedX, expectedY) {
		this.array = array
		this.index = index
		this.expectedX = expectedX
		this.expectedY = expectedY
		this.actualReference = array[index]
	}
}