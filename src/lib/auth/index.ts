// Much more work to be done here. Just setting up some minor stuff for now.
// Need to catch unhandled exceptions at the root and handle 401 to redirect to login.
// Need login logic
// Need logot logic.

const setToken = (token: string) => {
    window.localStorage.setItem('authKey', token)
}

const getToken = (): string | null => {
    return window.localStorage.getItem('authKey')
}

export {
    setToken,
    getToken
}