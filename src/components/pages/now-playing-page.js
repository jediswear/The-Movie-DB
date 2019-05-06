import React from 'react'
import MovieCategory from '../movie-categorie'

const NowPlayingPage = ({ getData, title })  => {

    return(
        <React.Fragment>
            <MovieCategory title={ title ? title : 'No title' } getData={ getData }/>
        </React.Fragment>
    )
}

export default NowPlayingPage