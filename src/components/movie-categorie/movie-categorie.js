import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { withApiService } from '../hoc'
import { getMovies, moviesRequested, moviesError, getSelectedMovie } from '../../actions'

import Loader from '../loader'
import ErrorIndicator from '../error-indicator'
import './movie-categorie.scss'

class MovieCategoryContainer extends Component {

    updateMovie() {

        /**
         * receive data
         * */
        const {
            getMovies,
            moviesError,
            getData } = this.props

        /**
         * dispatch action to store
         * */
        getData()
            .then(res => {
                getMovies(res)
            })
            .catch((err) => moviesError(err))
    }

    componentDidMount(){

        const { moviesRequested } = this.props

        /**
         * turn loaded state to false
         * */
        moviesRequested()

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
            <div className="col-lg-6" key={ id }>
                <MovieItem movie={ movie } />
            </div>
        )
    })

    return(
            <div className="row top-block">
                <h5 className="block-title col-12">{ title }</h5>
                { movieCards }
            </div>
    )
}

const MovieItem = ({ movie }) => {

    const { id, title, year, genres, poster, rating, overview } = movie

    return(
        <Link className="card movie-card" to={ `/movie/${id}` }>
            <span className="rating-label">{ rating }</span>
            <div className="card-img-top">
                <div className="ratio">
                    <img src={ poster } alt="..." />
                </div>
            </div>
            <div className="card-body">
                <h5 className="card-title">{ title }</h5>
                <p className="card-subtitle">{ year }</p>
                <p className="card-text">{ overview }</p>
                <div className="more">More...</div>
            </div>
        </Link>
    )
}



/**
 * which data to get from redux store
 * */
const mapStateToProps = (state) => {

    const { movies, loaded, hasError, selectedMovie } = state

    return {
        movies,
        loaded,
        hasError,
        selectedMovie
    }
}

/**
 * what actions we want to use
 * метод обернет каждый action в bindActionCreators и дейстивие сразу будет передаватся в dispatch
 * */
const mapDispatchToProps = {
    getMovies,
    moviesRequested,
    moviesError,
    getSelectedMovie
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