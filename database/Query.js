module.exports = class DatabaseQuery {
	constructor() {
		this._where = new Map()
		this._with = new Map()
		this._limit = null
		this._offset = null
	}

	where(field, comparator, value = null) {
		if (value == null) {
			this._where.set(field, { '$eq': comparator })
		} else {
			this._where.set(field, { [comparator]: value })
		}
		return this
	}

	with(name, model) {
		this._with.set(name, { as: name, model })
		return this
	}

	limit(quantity) {
		this._limit = Number(quantity)
		return this
	}

	offset(quantity) {
		this._offset = Number(quantity)
		return this
	}

	page(n, perPage) {
		return this.limit(perPage)
			.offset((Number(n) - 1) * Number(perPage))
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

		for (const [, relation] of this._with) {
			query.include = query.include ? query.include.concat([relation]) : [relation]
		}

		if (this._limit) {
			query.limit = this._limit
		}

		if (this._offset) {
			query.offset = this._offset
		}

		return query
	}
}
