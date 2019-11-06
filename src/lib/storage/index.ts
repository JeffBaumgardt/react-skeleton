import {APP_NAME} from '../../appConfig'

class Storage {
	public clear() {
		window.localStorage.clear()
	}

	private getStoreKey(key: string): string {
		return `${APP_NAME}_${key}`
	}

	private fetch(key: string): string | null {
		const storeKey = this.getStoreKey(key)
		if (window.localStorage[storeKey]) {
			return JSON.parse(window.localStorage.getItem(storeKey) || '')
		}
		return null
	}

	private store<TValue>(key: string, value: TValue): void {
		const storeKey = this.getStoreKey(key)
		if (value === null || value === undefined) {
			window.localStorage.removeItem(storeKey)
		} else {
			window.localStorage.setItem(storeKey, JSON.stringify(value))
		}
	}

	public save<TValue>(key: string, value: TValue) {
		this.store(key, value)
	}

	public get(key: string) {
		return this.fetch(key)
	}
}

export default new Storage()
