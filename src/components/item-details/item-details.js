import React, { Component } from 'react'
import { withApiService } from '../hoc'
import { connect } from "react-redux"
import './item-details.scss'

class ItemDetailsContainer extends Component {

    componentDidUpdate(prevProps, prevState){
        if (prevProps !== this.props){
            this.updateItem()
        }
    }

    componentDidMount(){
        this.updateItem()
    }

    updateItem(){
        const { selectedId:itemId, apiService, selectedMovie } = this.props

        if (!itemId){
            return
        }

        apiService
            .getById(itemId)
            .then(movie => {
                selectedMovie(movie)
            })
    }


    render(){

        const { selectedMovie } = this.props

        return (
            <ItemDetails movie={ selectedMovie }/>
        )
    }
}

const ItemDetails = ({ movie }) => {

    if (!movie){
        return <div></div>
    }

    const { title, year, genres, poster, overview } = movie

     return (
         <div className="col-5 details-card">
             <div className="card mb-3">
                 <h3 className="card-header">{ title } ({ year })</h3>
                 <div className="card-body">
                     <h6 className="card-subtitle text-muted">{ genres }</h6>
                 </div>
                 <img className="card-image" src={ poster } alt="Card" />
                 <div className="card-body">
                     <p className="card-text">{ overview }</p>
                 </div>
                 {/*<ul className="list-group list-group-flush">
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
                 </div>*/}
             </div>
         </div>
     )
}

const mapStateToProps = (state) => {
    const { selectedMovie } = state

    return {
        selectedMovie
    }
}

export default withApiService()(connect(mapStateToProps)(ItemDetailsContainer))