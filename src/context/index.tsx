import * as React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {AppConfig} from '../appConfig'
import ReduxProvider from './redux'
import {AuthProvider} from './auth'
import {APIProvider} from './api'

const AppProviders: React.FC<{config: AppConfig}> = ({children, config}) => {
    return (
        <APIProvider basePath={config.API_ROOT}>
            <AuthProvider>
                <BrowserRouter>
                    <ReduxProvider>{children}</ReduxProvider>
                </BrowserRouter>
            </AuthProvider>
        </APIProvider>
    )
}

export default AppProviders
