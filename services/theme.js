const { cache } = service
const Settings = local('database/repositories/settings')

class ThemeProvider {

	constructor() {
		this.customData = null
	}

	async getThemeParams() {
		return await cache.remember('theme', async () => {
			const path = await this.getPath()
			return await jetpack.readAsync(`${path}/meta.json`, 'json')
		})
	}

	async getPath() {
		return await cache.remember('theme-path', async () => {
			const theme = await Settings.byName('theme')
			return jetpack.path('themes', theme.value)
		})
	}

	async getName() {
		const params = await this.getThemeParams()
		return params.name || 'An Unnamed Bark Theme'
	}

	async bustThemeCache() {
		this.customData = null
		return await Promise.all([
			cache.forget('theme'),
			cache.forget('theme-path'),
		])
	}

	async getCustomData() {
		if (this.customData == null) {
			await this.reloadCustomData()
		}
		return this.customData
	}

	async reloadCustomData() {
		const { custom_data } = await this.getThemeParams()
		if (custom_data) {
			this.customData = custom_data
		} else {
			this.customData = {}
		}
	}
}

module.exports = new ThemeProvider()
const normaliseName = module.exports.normaliseName = function normaliseThemeName(name) {
	return name.toLowerCase().replace(' ', '_')
}
