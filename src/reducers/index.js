const initialState = {
    movies: [],
    loaded: false,
    hasError: null
}

const reducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {
        case 'MOVIES_REQUESTED':
            return {
                movies: [],
                loaded: false,
                hasError: null
            }
        case 'GET_MOVIE_COLLECTION':
            const amount = 6

            return state = {
                movies: payload.splice(0, amount),
                loaded: true,
                hasError: null
            }
        case 'MOVIES_ERROR':
            return {
                movies: [],
                loaded: true,
                hasError: payload
            }
        default:
            return state
    }
}

export default reducer