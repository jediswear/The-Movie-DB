import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from '../header'
import ItemList from '../item-list'
import ItemDetails from '../item-details'
import MovieCategory from '../random-movie'
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
        return(
            <React.Fragment>
                <Router>
                    <Header title="The Movie DB"/>
                    <div className="container body">
                        <Route path="/" exact render={() => <MovieCategory category="Now in theatres:" getData={ this.api.getNowPlaying }/> }/>
                        <Route path="/" exact render={() => <MovieCategory category="Popular:" getData={ this.api.getPopular }/> }/>
                        <Route path="/" exact render={() => <MovieCategory category="Top Rated:" getData={ this.api.getTopRated }/> }/>
                        <Route path="/" exact render={() => <MovieCategory category="Upcoming:" getData={ this.api.getUpcoming }/> }/>
                        <div className="row">
                            {itemList}
                            <Route path="/movie/:id"
                                   render={({ match }) => {
                                       const { id } = match.params
                                       console.log(id);
                                       return <ItemDetails itemId={ id }/>
                                   }}/>
                        </div>
                    </div>
                </Router>
            </React.Fragment>
        )

        const itemList = <ItemList
            onSelected={this.onItemSelected}
            getData={this.api.getPopular}
        >
            {({title, vote_average}) => (
            <React.Fragment>
                {title}<span className="badge badge-pill">{vote_average}</span>
            </React.Fragment>)}
        </ItemList>
    }
}
