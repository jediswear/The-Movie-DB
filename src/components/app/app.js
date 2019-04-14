import React from 'react'
import Header from '../header'
import ItemList from '../item-list'
import ItemDetails from '../item-details'
import RandomMovie from '../random-movie'

const App = () => {
    return(
        <div className="container">
            <Header title="The Movie DB"/>
            <RandomMovie/>
            <div className="row">
                <ItemList/>
                <ItemDetails/>
            </div>
        </div>
    )
}

export default App