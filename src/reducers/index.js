const initialState = {
    movies: [],
    loaded: false,
    hasError: null,
    list: [],
    selectedId: null,
    selectedMovie: null,
    searchResults: [],
    movieById: null,
    currentPage: 1,
    totalPages: 1
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
            const amount = 20

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
                list: payload.slice(6, payload.length)
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
        case 'FETCH_MOVIE_BY_ID':
            return {
                ...state,
                movieById: payload
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: payload
            }
        case 'SET_TOTAL_PAGES':
            return {
                ...state,
                totalPages: payload
            }
        default:
            return state
    }
}

export default reducer