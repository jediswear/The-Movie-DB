import React, { Component } from 'react'
import ApiService from '../../services/api-service'
import Loader from '../loader'
import './random-movie.scss'

export default class RandomMovie extends Component {

    api = new ApiService()

    state = {
        movies: [],
        id: null,
        title: null,
        year: null,
        genres: null,
        poster: null,
        loaded: false
    }

    updateMovie(amount = 4) {
        this.api
            .getNowPlaying()
            .then(list => {

                this.setState({
                    movies: list.splice(0, amount),
                    loaded: true
                })
            })
    }

    onError = (err) => {
        console.log(err);
    }


    generateRandomId(){
        return Math.floor(Math.random()*1000)
    }

    componentDidMount(){
        setTimeout(() => {this.updateMovie()}, 2000)
    }

    render(){

        const { loaded, movies } = this.state

        const moviesCards = movies.map(movie => {

            const { id } = movie

            return(
                <div className="col-3 movie-card-box" key={ id }>
                    <MovieContent movie={ movie } />
                </div>
            )
        })

        return(
            <div className="row top-block">
                { loaded ? moviesCards : <Loader/> }
            </div>
        )
    }
}

const MovieContent = ({ movie }) => {

    const { id, title, year, genres, poster } = movie

    return(
        <div className="card movie-card">
            <img src={ poster } className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{ title }</h5>
                <p className="card-text">{ year }, { genres }</p>
            </div>
        </div>
    )
}