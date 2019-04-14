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

    async updateMovie() {

        const list = await this.getMovies(4)

        this.setState(() => {
            return {
                movies: list,
                loaded: true
            }
        })

    }

    onError = (err) => {
        alert(err)
    }

    async getMovies(amount){
        const movieList = []

        for (let i = 0; i < amount; i++){
             const randomId = this.generateRandomId()

            await this.api.getById(randomId)
                .then((movie) => {
                    movie.genres = movie.genres.map(el => el.name).join('')
                    movieList.push(movie)
                })
                .catch(() => this.onError(i))
        }

        return movieList
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
            return(
                <div className="col-3 movie-card-box">
                    <MovieContent movie={ movie } />
                </div>
            )
        })

        return(
            <div className="row">
                { loaded ? moviesCards : <Loader/> }
            </div>
        )
    }
}

const MovieContent = ({ movie }) => {

    const { id, title, year, genres, poster } = movie

    return(
        <div className="card movie-card" >
            <img src={ poster } className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{ title }</h5>
                <p className="card-text">{ year }, { genres }</p>
            </div>
        </div>
    )
}