import * as React from 'react'
import {login, logout} from 'lib/auth'

interface AuthContext {
	login: (email: string, password: string) => Promise<void>;
	logout: () => void
}

const AuthContext = React.createContext<AuthContext>({
	login,
	logout
})

const AuthProvider: React.FC = props => {
	return <AuthContext.Provider value={{
		login,
		logout,
	}} {...props} />
}

const useAuth = (): AuthContext => {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within a AutoProvider Context')
    }
    return context
}

export {AuthProvider, useAuth}
