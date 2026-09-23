export class entityPointer {
	team
	array
	index
	/**
	 * @param {string} team 
	 * @param {string} array 
	 * @param {number} index 
	 */
	constructor (array,index) {
		this.array = array
		this.index = index
	}
}