import React from 'react'
import ItemList from '../item-list'
import ItemDetails from '../item-details'
import MovieCategory from '../movie-categorie'

const PopularPage = ({ getData, title })  => {

    return(
        <React.Fragment>
            <MovieCategory title={ title ? title : 'No title' } getData={ getData }/>
            <div className="row">
                <ItemList/>
                <ItemDetails/>
            </div>
        </React.Fragment>
    )
}

export default PopularPage