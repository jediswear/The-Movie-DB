import React from 'react'
import ItemList from '../item-list'
import MovieCategory from '../movie-categorie'

const CardPage = ()  => {
    return(
        <React.Fragment>
            <MovieCategory title="Now in theatres" />
            <div className="row">
                <ItemList/>
            </div>
        </React.Fragment>
    )
}

export default CardPage