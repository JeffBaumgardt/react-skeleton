import * as React from 'react'
import {BrowserRouter} from 'react-router-dom'
import ReduxProvider from './redux'
import {AuthProvider} from './auth'

const AppProviders = ({children}) => {
    return (
		<AuthProvider>
			<BrowserRouter>
				<ReduxProvider>{children}</ReduxProvider>
			</BrowserRouter>
		</AuthProvider>
    )
}

export default AppProviders
