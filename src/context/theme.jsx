import React from 'react'
import { createMuiTheme, ThemeProvider as Provider } from '@material-ui/core/styles'

const theme = createMuiTheme({})

const ThemeProvider = ({ children }) => {
	return <Provider theme={theme}>{children}</Provider>
}

export default ThemeProvider
