import * as React from 'react'
import {BrowserRouter} from 'react-router-dom'
import ReduxProvider from './redux'
import {AuthProvider} from './auth'
import {APIProvider} from './api'
import {AppConfig} from '../appConfig'

const AppProviders: React.FC<{config: AppConfig}> = ({children, config}) => {
    return (
        <BrowserRouter>
            <APIProvider basePath={config.API_ROOT}>
                <AuthProvider>
                    <ReduxProvider>
                        {children}
                    </ReduxProvider>
                </AuthProvider>
            </APIProvider>
        </BrowserRouter>
    )
}

export default AppProviders