import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withApiService } from '../hoc'
import { getMovies, moviesRequested, moviesError, getSelectedMovie } from '../../actions'

import Loader from '../loader'
import ErrorIndicator from '../error-indicator'
import './movie-categorie.scss'

class MovieCategoryContainer extends Component {

    getItem = (id) => {
        const { apiService, getSelectedMovie } = this.props

        apiService
            .getById(id)
            .then(movie => {
                getSelectedMovie(movie)
            })
    }

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
            <MovieCategory movies={movies} title={title} onSelected={this.getItem} />
            )
    }
}

const MovieCategory = ({ movies, title, onSelected }) => {

    const movieCards = movies.map(movie => {
        const { id } = movie

        return(
            <div className="col-lg-2 col-md-4 col-sm-6" key={ id }>
                <MovieItem movie={ movie } onSelected={onSelected} />
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

const MovieItem = ({ movie, onSelected }) => {

    const { id, title, year, genres, poster, rating } = movie

    return(
        <div className="card movie-card" onClick={ () => onSelected(id) }>
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