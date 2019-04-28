import React, { Component } from 'react'
import { connect } from 'react-redux'
import withApiService from '../hoc/with-api-service'
import { getMoviesList, selectedId, getSelectedMovie } from '../../actions'
import { Link } from "react-router-dom";
import Loader from '../loader'
import './item-list.scss'

class ItemListContainer extends Component {

    getList(){
        const { apiService, getMoviesList } = this.props

        apiService.getPopular()
            .then(res => {
               getMoviesList(res)
            })
    }

    getListItem = (id) => {

        const { apiService, getSelectedMovie } = this.props

        apiService.getById(id)
            .then(movie => {
                getSelectedMovie(movie)
            })
    }

    componentDidMount(){
        setTimeout(() => this.getList(), 1000)
    }

    render(){

        const { list } = this.props

        if (list.length === 0){
            return (
                    <div className="col-7">
                        <Loader/>
                    </div>
                )
        }

        return(
            <ItemList {...this.props} onSelected={(id) => this.getListItem(id)} />
        )
    }
}

const selectActive = (e) => {
    const selectedItem = document.querySelector('li.active')

    if(selectedItem){
        selectedItem.classList.remove('active')
    }

    e.target.classList.add('active')
}

const ItemList = ({ list, onSelected }) => {
    const movies = list.map(movie => {

        const { id } = movie

        return(
            <li className="list-group-item d-flex justify-content-between align-items-center"
                key={ id }
                onMouseOver={ (e) => {
                    onSelected(id)
                    selectActive(e)
                } }>
                <Item movie={ movie }/>
            </li>
        )
    })

    return (
        <div className="col-md-8 col-sm-12">
            <ul className="list-group list-menu">
                { movies }
            </ul>
        </div>
    )
}

const Item = ({ movie }) => {

    const { title, rating, id } = movie

    return(
        <Link className="list-link" to={ `/movie/${id}`}>
            {title}<span className="badge badge-pill">{rating}</span>
        </Link>

    )
}

const mapStateToProps = (state) => {

    const { list, selectedMovie } = state

    return {
        list,
        selectedMovie
    }
}

const mapDispatchToProps = {
    getMoviesList,
    selectedId,
    getSelectedMovie
}

export default withApiService()(
    connect(mapStateToProps, mapDispatchToProps)(ItemListContainer)
)