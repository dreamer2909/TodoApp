import { applyMiddleware, createStore } from 'redux'
import reducers from './reducer'
import thunk from 'redux-thunk'

const middleware = [ thunk ]

export const store = createStore(
    reducers,
    applyMiddleware(...middleware)
)