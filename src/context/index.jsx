import * as React from 'react'
import {BrowserRouter} from 'react-router-dom'
import ReduxProvider from './redux'
import { AuthProvider } from './auth'
import ThemeProvider from './theme'

const AppProviders = ({children}) => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <ReduxProvider>
                    <ThemeProvider>{children}</ThemeProvider>
                </ReduxProvider>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default AppProviders
