export default class {
	/**
	 * @param {number} width 
	 * @param {number} height 
	 */
	constructor(height = 1, width = 1) {
		let wip = {}
		wip.height = height
		wip.width = width
		for (let pt = 0; pt < height; pt++) {
			let row = { length: width } 
			for (let ix = 0; ix < width; ix++) {
				row[ix] = null
			}

			wip[pt] = new Proxy(row, {
				get (target, property, receiver) {
					let intProp = parseInt(property)
					if (intProp !== NaN) {
						if (intProp >= 0 && intProp < width) {
							return Reflect.get(target,property,receiver)
						}
						throw new RangeError("attempted to get item outside of board bounds")
					}
					return Reflect.get(target, property, receiver)
				},

				set (target, property, value, receiver) {
					return Reflect.set(target, property, value, receiver)
				}
			})
		}
		return new Proxy(wip, {
			get(target, property, receiver) {
				let intProp = parseInt(property)
				if (intProp !== NaN) {
					if (intProp >= 0 && intProp < height) {
						return Reflect.get(target, property, receiver)
					}
					throw new RangeError("attempted to get item outside of board bounds")
				}
				return Reflect.get(target, property, receiver)
			},

			set(target, property, value, receiver) {
				return Reflect.set(target, property, value, receiver)
			}
		})
	}
}