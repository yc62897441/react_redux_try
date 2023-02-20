import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, createStore } from 'redux'
import todoReducer from '../reducer/todolist'
import todoReducer2 from '../reducer/todolist2'
import weatherReducer from '../reducer/weather'

const rootReducer = combineReducers({
    todoReducer,
    todoReducer2,
    weatherReducer,
})

const store = createStore(rootReducer)

export default store
