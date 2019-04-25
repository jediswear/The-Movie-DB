import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withApiService } from '../hoc'
import { getMovies, moviesRequested, moviesError } from '../../actions'

import Loader from '../loader'
import ErrorIndicator from '../error-indicator'
import './movie-categorie.scss'

class MovieCategoryContainer extends Component {

    updateMovie() {

        /**
         * receive data
         * */
        const {
            apiService,
            moviesRequested,
            getMovies,
            moviesError } = this.props

        /**
         * turn loaded state to false
         * */
        moviesRequested()

        /**
         * dispatch action to store
         * */
        apiService.getPopular()
            .then(res => {
                getMovies(res)
            })
            .catch((err) => moviesError(err))
    }

    componentDidMount(){

        const delay = Math.floor(Math.random()*2000)

        setTimeout(() => {this.updateMovie()}, delay)
    }

    render(){
        const { loaded, movies, title, hasError } = this.props

        if(!loaded){
            return (
                <Loader/>
            )
        }

        if (hasError){
            return(
                <ErrorIndicator/>
            )
        }

        return(
            <MovieCategory movies={movies} title={title} />
            )
    }
}

const MovieCategory = ({ movies, title }) => {

    const movieCards = movies.map(movie => {
        const { id } = movie

        return(
            <div className="col-lg-2 col-md-4 col-sm-6" key={ id }>
                <MovieItem movie={ movie } />
            </div>
        )
    })

    return(
            <div className="row top-block">
                <h6 className="col-12">{ title }</h6>
                { movieCards }
            </div>
    )
}

const MovieItem = ({ movie }) => {

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
 * метод обернет getMovies в bindActionCreators и дейстивие сразу будет передаватся в dispatch
 * */
const mapDispatchToProps = {
    getMovies,
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
    connect(mapStateToProps, mapDispatchToProps)(MovieCategoryContainer)
)