import * as actions from '../action/todolist'

const initState = {
    stayNotChanged: 'stayNotChanged',
    todoList: ['todoList 1: 第一件事情', 'todoList 1: 第二件事情'],
}

const todoReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.ADD_TODO:
            return {
                ...state,
                todoList: [...state.todoList, action.payload.todo],
            }
        default:
            return state
    }
}

export default todoReducer
