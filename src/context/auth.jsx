import * as React from 'react'
import {login, logout} from 'lib/auth'

const AuthContext = React.createContext({
	login,
	logout
})

const AuthProvider = props => {
	return <AuthContext.Provider value={{
		login,
		logout,
	}} {...props} />
}

const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within a AutoProvider Context')
    }
    return context
}

export {AuthProvider, useAuth}
