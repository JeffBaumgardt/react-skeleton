import {applyMiddleware, createStore, compose, Middleware, Action, AnyAction, StoreEnhancer, DeepPartial} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducer'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore<S = any, A extends Action = AnyAction>(preloadedState?: DeepPartial<S>) {
    const middleware: Middleware<{}, S>[] = [thunkMiddleware]
    const middleEnhancer = applyMiddleware(...middleware)
    const enhancers: StoreEnhancer[] = [middleEnhancer]
    const composedEnhancers = composeEnhancer(...enhancers) as StoreEnhancer

    return createStore(rootReducer, preloadedState as DeepPartial<S>, composedEnhancers)
}