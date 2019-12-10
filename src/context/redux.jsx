import {Provider} from 'react-redux'
import configureStore from 'lib/redux'
import * as React from 'react'

export const store = configureStore()

const ReduxProvider = ({children}) => {
    return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
