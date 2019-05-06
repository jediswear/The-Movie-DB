import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { withApiService } from '../hoc'
import { connect } from "react-redux";

import Header from '../header'
import { PopularPage, TopRatedPage, NowPlayingPage, UpcomingPage, MoviePage } from '../pages'
import './app.scss'

const App  = ({ apiService, currentPage }) => {

    return (
        <React.Fragment>
            <Header title="The Movie DB"/>
            <div className="container">
                <Switch>
                    <Route
                        path="/popular"
                        render={ () =>
                            <PopularPage
                            getData={ () => apiService.getPopular(currentPage) }
                            title="Popular movies"
                            /> }
                    />
                    <Route
                        path="/top_rated"
                        render={ () => <TopRatedPage getData={ () => apiService.getTopRated(currentPage) } title="Top rated movies" /> }
                    />
                    <Route
                        path="/"
                        render={ () => <NowPlayingPage getData={ () => apiService.getNowPlaying(currentPage) } title="Now in theatres" /> }
                        exact
                    />
                    <Route
                        path="/upcoming"
                        render={ () => <UpcomingPage getData={ () => apiService.getUpcoming(currentPage) } title="Upcoming movies" /> }
                    />
                    <Route
                        path="/movie/:id"
                        component={MoviePage}
                    />
                </Switch>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = ({ currentPage }) => {
    return {
        currentPage
    }
}

export default withApiService()(connect(mapStateToProps)(App))
