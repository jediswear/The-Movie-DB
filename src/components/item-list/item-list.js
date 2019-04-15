import React, { Component } from 'react'
import Loader from '../loader'

export default class ItemList extends Component {

    state = {
        list: []
    }

    getList(){
        const { getData } = this.props

        getData()
            .then(res => {
                this.setState({
                    list: res
                })
            })
    }

    componentDidMount(){
        setTimeout(() => this.getList(), 1000)
    }

    render(){

        const { list } = this.state
        const { onSelected } = this.props
        const content = (item) => this.props.children(item)

        if (list.length === 0){
            return (
                    <div className="col-8">
                        <Loader/>
                    </div>
                )
        }

        const movies = list.map(movie => {

            const { id } = movie

            return(
                <li className="list-group-item d-flex justify-content-between align-items-center" key={ id } onClick={ () => onSelected(id) }>
                    <Item movie={ movie } renderItem={ (movie) => content(movie) } />
                </li>
            )
        })

        return (
            <div className="col-8">
                <ul className="list-group">
                    { movies }
                </ul>
            </div>
        )
    }
}

const Item = ({ movie, renderItem }) => {

    const { title, vote_average } = movie

    return(
        <React.Fragment>
            { renderItem(movie) }
        </React.Fragment>
    )
}