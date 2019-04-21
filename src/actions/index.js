const getMovieList = (moviesData) => {
    return {
        type: 'GET_MOVIE_COLLECTION',
        payload: moviesData
    }
}

const moviesRequested = () => {
    return {
        type: 'MOVIES_REQUESTED'
    }
}

const moviesError = (error) => {
    return {
        type: 'MOVIES_ERROR',
        payload: error
    }
}

export {
    getMovieList,
    moviesRequested,
    moviesError
}