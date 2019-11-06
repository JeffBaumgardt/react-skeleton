import React from 'react'
import AppProviders from 'context'
import './styles/index' // css files
import config from './appConfig'

import Routes from 'Pages/Routes'

const App: React.FC = () => {
    return (
        <AppProviders config={config}>
            <Routes />
        </AppProviders>
    )
}

export default App
