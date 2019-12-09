import * as React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {AppConfig} from '../appConfig'
import ReduxProvider from './redux'
import {AuthProvider} from './auth'

const AppProviders: React.FC<{config: AppConfig}> = ({children, config}) => {
    return (
		<AuthProvider>
			<BrowserRouter>
				<ReduxProvider>{children}</ReduxProvider>
			</BrowserRouter>
		</AuthProvider>
    )
}

export default AppProviders
