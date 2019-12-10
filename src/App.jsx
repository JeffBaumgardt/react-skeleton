import React from 'react'
import AppProviders from 'context'
import './styles/index' // css files
import Routes from 'Pages/Routes'
import config from './appConfig'


const App = () => {
    return (
        <AppProviders config={config}>
            <Routes />
        </AppProviders>
    )
}

export default App
