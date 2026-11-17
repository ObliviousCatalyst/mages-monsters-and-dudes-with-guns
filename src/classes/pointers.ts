import { Card, Unit } from "./cards/base.js"
import { board } from "./key-objects.js"

export class entityPointer {
	array
	index
	/**
	 * @type {unit}
	 */
	actualReference: Card
	expectedX: number | null
	expectedY: number | null
	board: board
	/**
	 * @param {board} board 
	 * @param {card[]} array 
	 * @param {number} index 
	 * @param {number} expectedX 
	 * @param {number} expectedY 
	 */
	constructor (board: board , array: Card[], index: number, expectedX: number | null = null, expectedY: number | null = null) {
		this.array = array
		this.index = index
		this.expectedX = expectedX
		this.expectedY = expectedY
		this.actualReference = array[index]!
		this.board = board
	}

	/**
	 * politely ask the board to move me
	 * @param {number} x 
	 * @param {number} y 
	 */
	move (x: number, y: number) {
		this.board.moveUnit(this,x,y)
	}
}