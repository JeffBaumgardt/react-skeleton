import {applyMiddleware, createStore, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducer'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore(preloadedState) {
    const middleware = [thunkMiddleware]
    const middleEnhancer = applyMiddleware(...middleware)
    const enhancers = [middleEnhancer]
    const composedEnhancers = composeEnhancer(...enhancers)

    return createStore(rootReducer, preloadedState, composedEnhancers)
}
