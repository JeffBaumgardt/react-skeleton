import Storage from 'lib/storage'
import {APP_NAME} from '../../appConfig'
// Much more work to be done here. Just setting up some minor stuff for now.
// Need to catch unhandled exceptions at the root and handle 401 to redirect to login.
// Need login logic
// Need logot logic.

interface LoginRequestBody {
    email: string;
    password: string;
    applicationId: string;
}

export const login = async (email: string, password: string): Promise<void> => {
	const body = { email, password, applicationId: APP_NAME }

	// implement auth api
}

export const logout = () => {
	Storage.clear()
	window.history.replaceState(null, '', '/')
	window.location.href = '/'
}

export const setToken = (token: string) => {
    window.localStorage.setItem('authKey', token)
}

export const getToken = (): string | null => {
    return window.localStorage.getItem('authKey')
}
