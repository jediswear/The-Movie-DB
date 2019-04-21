import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withApiService } from '../hoc'
import { getMovieList, moviesRequested, moviesError } from '../../actions'

import Loader from '../loader'
import ErrorIndicator from '../error-indicator'
import './movie-categorie.scss'

class MovieCategory extends Component {

    updateMovie(amount = 6) {

        /**
         * receive data
         * */
        const { apiService, moviesRequested, getMovieList, moviesError } = this.props

        /**
         * turn loaded state to false
         * */
        moviesRequested()

        /**
         * dispatch action to store
         * */
        apiService.getPopular()
            .then(res => {
                getMovieList(res)
            })
            .catch((err) => moviesError(err))
    }

    componentDidMount(){

        const delay = Math.floor(Math.random()*2000)

        setTimeout(() => {this.updateMovie()}, delay)
    }

    render(){
        const { loaded, movies, category, hasError } = this.props

        if (hasError){
            return(
                <ErrorIndicator/>
            )
        }

        const moviesCards = movies.map(movie => {
            const { id } = movie

            return(
                <div className="col-lg-2 col-md-4 col-sm-6" key={ id }>
                    <MovieContent movie={ movie } />
                </div>
            )
        })

        return(
            <React.Fragment>
                <h6>{ category  }</h6>
                <div className="row top-block">
                    {loaded ? moviesCards : <Loader/>}
                </div>
            </React.Fragment>
        )
    }
}

const MovieContent = ({ movie }) => {

    const { title, year, genres, poster, rating } = movie

    return(
        <div className="card movie-card">
            <span className="rating-label">{ rating }</span>
            <div className="card-img-top">
                <img src={ poster } alt="..." />
            </div>
            <div className="card-body">
                <h5 className="card-title">{ title }</h5>
                <p className="card-text">{ year }, { genres }</p>
            </div>
        </div>
    )
}



/**
 * which data to get from redux store
 * */
const mapStateToProps = (state) => {

    const { movies, loaded, hasError } = state

    return {
        movies, loaded, hasError
    }
}

/**
 * what actions we want to use
 * метод обернет getMovieList в bindActionCreators и дейстивие сразу будет передаватся в dispatch
 * */
const mapDispatchToProps = {
    getMovieList,
    moviesRequested,
    moviesError
}


/**
 * to get apiService
 * */
export default withApiService()(
    /**
     * for connecting to redux store
     * */
    connect(mapStateToProps, mapDispatchToProps)(MovieCategory)
)