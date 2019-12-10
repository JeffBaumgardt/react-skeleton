import {APP_NAME} from '../../appConfig'

class Storage {
	clear() {
		window.localStorage.clear()
	}

	getStoreKey(key) {
		return `${APP_NAME}_${key}`
	}

	etch(key) {
		const storeKey = this.getStoreKey(key)
		if (window.localStorage[storeKey]) {
			return JSON.parse(window.localStorage.getItem(storeKey) || '')
		}
		return null
	}

	store(key, value) {
		const storeKey = this.getStoreKey(key)
		if (value === null || value === undefined) {
			window.localStorage.removeItem(storeKey)
		} else {
			window.localStorage.setItem(storeKey, JSON.stringify(value))
		}
	}

	save(key, value) {
		this.store(key, value)
	}

	get(key) {
		return this.fetch(key)
	}
}

export default new Storage()
