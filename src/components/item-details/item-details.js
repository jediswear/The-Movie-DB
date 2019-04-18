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

    componentDidMount(){
        this.updateItem()
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

        const { movie: { id, title, year, genres, poster, overview }, selected } = this.state

        if (!selected){
            return(
                <div></div>
            )
        }

        return (
            <div className="col-5 details-card">
                <div className="card mb-3">
                    <h3 className="card-header">{ title } ({ year })</h3>
                    <div className="card-body">
                        <h6 className="card-subtitle text-muted">{ genres }</h6>
                    </div>
                    <img className="card-image" src={ poster } alt="Card image" />
                    <div className="card-body">
                        <p className="card-text">{ overview }</p>
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
