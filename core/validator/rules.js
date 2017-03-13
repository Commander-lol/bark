const nullIfTrue = val => val === true ? null : val

module.exports = {
	exists: name => val => nullIfTrue(!!val || `${name} must exist`),
	isString: name => val => nullIfTrue(typeof val === 'string' || `${name} must be a string`),
	isNumeric: name => val => nullIfTrue(/^\d+(?:\.\d+)/.test(val) || `${name} must be a numeric value`),
	notEmpty: name => val => {
		const err = `${name} must not be empty`
		if (Array.isArray(val)) {
			if (val.length === 0) return err
		} else if (typeof val === 'string') {
			if (val.trim().length === 0) return err
		} else if (typeof val === 'object') {
			if (Object.entries(val).length === 0) return err
		}
		return null
	},
}
