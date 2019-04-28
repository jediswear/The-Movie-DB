import React from 'react'
import ItemList from '../item-list'
import ItemDetails from '../item-details'
import MovieCategory from '../movie-categorie'

const NowPlayingPage = ({ getData, title })  => {

    return(
        <React.Fragment>
            <MovieCategory title={ title ? title : 'No title' } getData={ getData }/>
            <div className="row list-container">
                <ItemList/>
                <ItemDetails/>
            </div>
        </React.Fragment>
    )
}

export default NowPlayingPage