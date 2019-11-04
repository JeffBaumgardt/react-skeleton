import React from 'react'
import AppProviders from 'context'
import config from './appConfig'

const App: React.FC = () => {
  return (
    <AppProviders config={config}>
      <span>Hello World</span>
    </AppProviders>
  )
}

export default App
