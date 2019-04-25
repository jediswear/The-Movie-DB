const initialState = {
    movies: [],
    loaded: false,
    hasError: null,
    list: []
}

const reducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {
        case 'FETCH_MOVIES_REQUEST':
            return {
                ...state,
                movies: [],
                loaded: false,
                hasError: null
            }
        case 'FETCH_MOVIES_SUCCESS':
            const amount = 6

            return state = {
                ...state,
                movies: payload.splice(0, amount),
                loaded: true,
                hasError: null
            }
        case 'FETCH_MOVIES_FAILURE':
            return {
                ...state,
                movies: [],
                loaded: true,
                hasError: payload
            }
        case 'FETCH_MOVIES_LIST_SUCCESS':
            return {
                ...state,
                list: payload
            }
        default:
            return state
    }
}

export default reducer