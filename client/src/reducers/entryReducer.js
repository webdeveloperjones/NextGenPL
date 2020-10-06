const entryReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ENTRIES':
            return [...action.data]
        case 'ADD_ENTRY':
            return [action.data, ...state]
        default:
            return state
    }
}


export const setEntries = (items) => {
    return {
        type: 'SET_ENTRIES',
        data: items
    }
}

export const addEntry = (item) => {
    return {
        type: 'ADD_ENTRY',
        data: item
    }
}

export default entryReducer