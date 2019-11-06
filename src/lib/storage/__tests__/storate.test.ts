import Storage from '../index'
import appConfig from '../../../appConfig'

jest.mock('../../../appConfig', () => ({
	APP_NAME: 'testing'
}))

describe('Storage', () => {
	beforeEach(() => {
		Storage.clear()
	})

	test('Can clear the storage', () => {
		Storage.save<string>('fakeKey', '')
		expect(window.localStorage).toHaveLength(1)

		Storage.clear()
		expect(window.localStorage).toHaveLength(0)
	})

	test('Should be able to set and get a value', () => {
		const key = 'test'
		const value = 'value'

		Storage.save(key, value)

		expect(Storage.get(key)).toBe(value)
	})

	test('Should send a nullish value to save will clear the key', () => {
		const key = 'test'
		const value = 'value'

		Storage.save(key, value)
		expect(Storage.get(key)).toBe(value)

		Storage.save(key, null)
		expect(Storage.get(key)).toBeNull()
	})

	test('Should prepend the application name before the key', () => {
		const key = 'key'
		const storedKey = `${appConfig.APP_NAME}_${key}`

		Storage.save(key, 'value')

		expect(window.localStorage[storedKey]).toBeDefined()
		expect(window.localStorage.getItem(storedKey)).toBe(JSON.stringify('value'))
	})
})
