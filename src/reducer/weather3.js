const weatherReducer3 = (state = {}, action) => {
    switch (action.type) {
        case 'MAKE_DatasetDescriptionAndUpdate':
            return {
                ...state,
                ...action.payload,
            }
        case 'MAKE_DatasetDescriptionAndUpdateClear':
            return {}
        default:
            return {
                ...state,
            }
    }
}

export { weatherReducer3 }
