module.exports = class DatabaseQuery {
	constructor() {
		this._where = new Map()
	}

	where(field, comparator, value = null) {
		console.log(field, comparator, value)
		if (value == null) {
			this._where.set(field, { '$eq': comparator })
		} else {
			this._where.set(field, { [comparator]: value })
		}
		return this
	}

	before(field, time) {
		if (this._where.has(field)) {
			const entry = this._where.get(field)
			entry.$lt = new Date(time)
			this._where.set(field, entry)
		} else {
			this._where.set(field, { $lt: new Date(time) })
		}
	}

	after(field, time) {
		if (this._where.has(field)) {
			const entry = this._where.get(field)
			entry.$gt = new Date(time)
			this._where.set(field, entry)
		} else {
			this._where.set(field, { $gt: new Date(time) })
		}
	}

	get() {
		const query = {}

		for (const [field, condition] of this._where) {
			query.where = Object.assign((query.where || {}), { [field]: condition })
		}

		return query
	}
}
