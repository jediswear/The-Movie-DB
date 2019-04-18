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

    updateMovie(amount = 6) {
        const { getData } = this.props

        getData()
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

        const delay = Math.floor(Math.random()*2000)

        console.log(delay);

        setTimeout(() => {this.updateMovie()}, delay)
    }

    render(){

        const { loaded, movies } = this.state

        const { category } = this.props

        const moviesCards = movies.map(movie => {

            const { id } = movie

            return(
                <div className="col-2" key={ id }>
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

    const { id, title, year, genres, poster, rating } = movie

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