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

export {
    getMovies,
    moviesRequested,
    moviesError,
    getMoviesList
}