const { cache } = service
const Settings = local('database/repositories/settings')

class ThemeProvider {
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
		return await Promise.all([
			cache.forget('theme'),
			cache.forget('theme-path'),
		])
	}
}

module.exports = new ThemeProvider()
