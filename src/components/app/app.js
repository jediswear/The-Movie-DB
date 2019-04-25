import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { withApiService } from '../hoc'

import Header from '../header'
// import ItemList from '../item-list'
// import ItemDetails from '../item-details'
// import MovieCategory from '../movie-categorie'
import { HomePage, CardPage } from '../pages'
import './app.scss'

// import ApiService from "../../services/api-service";

const App  = () => {

    return (
        <React.Fragment>
            <Header title="The Movie DB"/>
            <div className="container">
                <Switch>
                    <Route path="/" component={ HomePage } exact />
                    <Route path="/popular" component={ CardPage } />
                    <Route path="/top_rated" component={ CardPage } />
                    <Route path="/now_playing" component={ CardPage } />
                    <Route path="/upcoming" component={ CardPage } />
                </Switch>
            </div>
        </React.Fragment>
    )



    /*api = new ApiService()

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
    }*/
}

export default withApiService()(App)
