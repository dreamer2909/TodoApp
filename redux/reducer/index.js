import { combineReducers } from 'redux'
import authReducer from './AuthReducer'
import taskReducer from './TaskReducer'

const reducers = combineReducers({
    authReducer,
    taskReducer
})

export default reducers