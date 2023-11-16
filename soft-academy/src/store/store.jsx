import {createStore, combineReducers } from 'redux'
import errorReducer from'./errorReducer'
import forumReducer from './forumReducer'

const rootReducer = combineReducers({
    forumReducer,
    errorReducer,
})
const store = createStore(rootReducer)
export default store