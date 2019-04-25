import React, { Component } from 'react'
import { connect } from 'react-redux'
import withApiService from '../hoc/with-api-service'
import { getMoviesList } from '../../actions'
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

    componentDidMount(){
        setTimeout(() => this.getList(), 1000)
    }

    render(){

        const { list, onSelected } = this.props

        if (list.length === 0){
            return (
                    <div className="col-7">
                        <Loader/>
                    </div>
                )
        }

        return(
            <ItemList {...this.props} />
        )
    }
}

const ItemList = ({ list, onSelected }) => {
    const movies = list.map(movie => {

        const { id } = movie

        return(
            <li className="list-group-item d-flex justify-content-between align-items-center" key={ id } onClick={ () => onSelected(id) }>
                <Item movie={ movie }/>
            </li>
        )
    })

    return (
        <div className="col-7">
            <ul className="list-group list-menu">
                { movies }
            </ul>
        </div>
    )
}

const Item = ({ movie }) => {

    const { title, rating } = movie

    return(
        <React.Fragment>
            {title}<span className="badge badge-pill">{rating}</span>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {

    const { list } = state

    return {
        list
    }
}

const mapDispatchToProps = {
    getMoviesList
}

export default withApiService()(
    connect(mapStateToProps, mapDispatchToProps)(ItemListContainer)
)