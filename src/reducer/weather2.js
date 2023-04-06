// ========================
// What is the use of middleware Redux thunk ?
// https://www.geeksforgeeks.org/what-is-the-use-of-middleware-redux-thunk/

const INITAL_STATE = {
    data: null,
}
const dataReducer = (state = INITAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_DATA':
            return {
                ...state,
                data: action.payload,
            }
        case 'DELETE_DATA':
            return INITAL_STATE
        default:
            return state
    }
}
export { dataReducer }