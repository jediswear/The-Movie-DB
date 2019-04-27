import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { withApiService } from '../hoc'

import Header from '../header'
import { PopularPage, TopRatedPage, NowPlayingPage, UpcomingPage } from '../pages'
import './app.scss'

const App  = ({ apiService }) => {

    return (
        <React.Fragment>
            <Header title="The Movie DB"/>
            <div className="container">
                <Switch>
                    <Route
                        path="/popular"
                        render={ () =>
                            <PopularPage
                            getData={ () => apiService.getPopular() }
                            title="Popular movies"
                            /> }
                    />
                    <Route
                        path="/top_rated"
                        render={ () => <TopRatedPage getData={ () => apiService.getTopRated() } title="Top rated movies" /> }
                    />
                    <Route
                        path="/"
                        render={ () => <NowPlayingPage getData={ () => apiService.getNowPlaying() } title="Now in theatres" /> }
                        exact
                    />
                    <Route
                        path="/upcoming"
                        render={ () => <UpcomingPage getData={ () => apiService.getUpcoming() } title="Upcoming movies" /> }
                    />
                </Switch>
            </div>
        </React.Fragment>
    )
}

export default withApiService()(App)
