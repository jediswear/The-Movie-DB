import React, { Component } from 'react'
import './movie-page.scss'
import {withApiService} from "../hoc"
import { connect } from "react-redux"
import { getMovieById } from "../../actions"

class MoviePage extends Component {

    updateMovie(){

        const { apiService, match: { params }, getMovieById } = this.props

        apiService
            .getById(params.id)
            .then(res => {
                getMovieById(res.movies)
            })
    }

    componentDidMount() {
        this.updateMovie()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevId = prevProps.match.params.id
        const currId = this.props.match.params.id

        if(prevId !== currId){
            this.updateMovie()
        }
    }

    render() {

        const { movieById } = this.props

        if (!movieById){
            return (
                <div></div>
            )
        }

        console.log(movieById);

        const { title, year, countries, genres, overview, poster } = movieById
        console.log(title);

        return(
            <div id="movie-page" className="row">
                <div className="col-12 main-section">
                    <div className="col-lg-4 col-md-6 main-image">
                        <div className="trailer-overlay">
                            <i className="material-icons">
                                play_circle_outline
                            </i>
                            <img
                                src={ poster }
                            />
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-6 main-content">
                        <h3 className="title">{ title } ({ year })</h3>
                        <h5 className="caption">Country</h5>
                        <p className="country">{ countries }</p>
                        <h5 className="caption">Genres</h5>
                        <p className="genres">{ genres }</p>
                        <h5 className="caption">Duration</h5>
                        <p className="duration">1.5h</p>
                        <h5 className="caption">Overview</h5>
                        <p className="overview">{ overview }</p>
                    </div>
                </div>
                <div className="col-12 casts"></div>
            </div>
        )
    }
}

const mapStateToProps = ({ movieById }) => {
        return {
            movieById
        }
}

const mapDispatchToProps = {
    getMovieById
}



export default withApiService()(connect(mapStateToProps, mapDispatchToProps)(MoviePage))