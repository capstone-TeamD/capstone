import { combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import user from './user'

const rootReducer = combineReducers({
    user
})

const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(rootReducer, middleware)

// export default rootReducer
export default store
export * from './user'