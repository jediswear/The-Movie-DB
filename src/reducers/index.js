const initialState = {
    movies: [],
    loaded: false,
    hasError: null,
    list: [],
    selectedId: null,
    selectedMovie: null,
    searchResults: []
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
        case 'SELECTED_ITEM_ID':
            return {
                ...state,
                selectedId: payload
            }
        case 'SELECTED_MOVIE':

            return {
                ...state,
                selectedMovie: payload
            }
        case 'FETCH_MOVIES_SEARCH_REQUEST':

            const maxSearchRes = 10

            return {
                ...state,
                searchResults: payload.slice(0, maxSearchRes)
            }
        default:
            return state
    }
}

export default reducer