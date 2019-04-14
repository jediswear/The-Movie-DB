import React, { Component } from 'react'
import ApiService from "../../services/api-service";
import './item-details.scss'

export default class ItemDetails extends Component {

    api = new ApiService()

    state = {
        selected: null,
        movie: {
            id: null,
            title: null,
            year: null,
            genres: null,
            poster: null,
        }
    }

    componentDidUpdate(prevProps, prevState){

        if (prevProps !== this.props){
            this.updateItem()
        }
    }

    updateItem(){

        const { itemId } = this.props

        this.api
            .getById(itemId)
            .then(movie => {
                this.setState({
                    movie,
                    selected: itemId
                })
            })
    }


    render(){

        const { movie: { id, title, year, genres, poster }, selected } = this.state

        console.log(selected);

        if (!selected){
            return(
                <div></div>
            )
        }

        return (
            <div className="col-4 details-card">
                <div className="card mb-3">
                    <h3 className="card-header">{ title }</h3>
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <h6 className="card-subtitle text-muted">Support card subtitle</h6>
                    </div>
                    <img className="card-image" src={ poster } alt="Card image" />
                    <div className="card-body">
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Cras justo odio</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                    </ul>
                    <div className="card-body">
                        <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a>
                    </div>
                    <div className="card-footer text-muted">
                        2 days ago
                    </div>
                </div>
            </div>
        )
    }
}
