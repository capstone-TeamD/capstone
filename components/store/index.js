import { combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import user from './user'
import photo from './photo'

const rootReducer = combineReducers({
    user,
    photo
})

const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(rootReducer, middleware)

// export default rootReducer
export default store
export * from './user'
export * from './photo'