import * as actions from '../action/todolist2'

const initState = {
    stayNotChanged: 'stayNotChanged',
    todoList: ['todoList 2: 第一件事情', 'todoList 2: 第二件事情'],
}

const todoReducer2 = (state = initState, action) => {
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

export default todoReducer2
