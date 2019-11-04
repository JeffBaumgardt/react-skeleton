import * as React from 'react'

type AuthContext = {}

const AuthContext = React.createContext<AuthContext>({})

const AuthProvider: React.FC = (props) => {
    return <AuthContext.Provider value={{}} {...props} />
}

const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within a AutoProvider Context')
    }
    return context
}

export {AuthProvider, useAuth}