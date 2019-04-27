const moviesRequested = () => {
    return {
        type: 'FETCH_MOVIES_REQUEST'
    }
}

const getMovies = (moviesData) => {
    return {
        type: 'FETCH_MOVIES_SUCCESS',
        payload: moviesData
    }
}

const moviesError = (error) => {
    return {
        type: 'FETCH_MOVIES_FAILURE',
        payload: error
    }
}

const getMoviesList = (moviesData) => {
    return {
        type: 'FETCH_MOVIES_LIST_SUCCESS',
        payload: moviesData
    }
}

const selectedId = (id) => {
    return {
        type: 'SELECTED_ITEM_ID',
        payload: id
    }
}

const getSelectedMovie = (movie) => {

    return {
        type: 'SELECTED_MOVIE',
        payload: movie
    }
}

const getMoviesBySearch = (moviesList) => {
    return{
        type: 'FETCH_MOVIES_SEARCH_REQUEST',
        payload: moviesList
    }
}

export {
    getMovies,
    moviesRequested,
    moviesError,
    getMoviesList,
    selectedId,
    getSelectedMovie,
    getMoviesBySearch
}