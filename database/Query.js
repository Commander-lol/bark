module.exports = class DatabaseQuery {
	constructor() {
		this._where = new Map()
	}

	where(field, comparator, value = null) {
		if (value == null) {
			this._where.set(field, { '$eq': comparator })
		} else {
			this._where.set(field, { [comparator]: value })
		}
		return this
	}

	get() {
		const query = {}

		for (const [field, condition] of this._where) {
			query.where = Object.assign((query.where || {}), { [field]: condition })
		}

		return query
	}
}
