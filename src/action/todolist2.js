export const ADD_TODO = 'ADD_TODO'

export const addTodo2 = (todo) => ({
    type: ADD_TODO,
    payload: {
        todo: `除了輸入內容: ${todo} 外，addTodo2 有額外新增內容`,
    },
})
