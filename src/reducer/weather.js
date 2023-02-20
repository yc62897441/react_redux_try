const initState = {}

function weatherReducer(state = initState, action) {
    switch (action.type) {
        case 'fetch':
            return {
                ...state,
                ...action.payload.fetchData,
            }
        default:
            return state
    }
}

export default weatherReducer
