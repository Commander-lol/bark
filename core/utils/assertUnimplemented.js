class MethodNotImplementedError extends Error {}

module.exports = function methodNotImplemented(name) {
	throw new MethodNotImplementedError(`Method ${name} has not been implemented`)
}
