import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from '../header'
import ItemList from '../item-list'
import ItemDetails from '../item-details'
import RandomMovie from '../random-movie'
import './app.scss'

import ApiService from "../../services/api-service";

export default class App extends Component {

    api = new ApiService()

    state = {
        selectedItem: null
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        })
    }

    componentDidMount(){
        this.api.getGenres()
    }


    render(){

        const { selectedItem } = this.state
        const itemList = <ItemList
            onSelected={this.onItemSelected}
            getData={this.api.getPopular}
        >
            {({title, vote_average}) => (
            <React.Fragment>
                {title}<span className="badge badge-pill">{vote_average}</span>
            </React.Fragment>)}
        </ItemList>

        return(
            <React.Fragment>
                <Router>
                        <Header title="The Movie DB"/>
                    <div className="container body">
                        <Route path="/test" component={RandomMovie}/>
                        {/*<RandomMovie/>*/}
                        <div className="row">
                            {itemList}
                            <ItemDetails itemId={selectedItem}/>
                        </div>
                    </div>
                </Router>
            </React.Fragment>
        )
    }
}
