import React, { Component } from 'react'
import Header from '../header'
import ItemList from '../item-list'
import ItemDetails from '../item-details'
import RandomMovie from '../random-movie'
import ApiService from "../../services/api-service";

export default class App extends Component {

    api = new ApiService()

    state = {
        selectedItem: null
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        })
    }

    componentDidMount(){
        this.api.getGenres()
    }


    render(){

        const { selectedItem } = this.state
        const itemList = <ItemList
            onSelected={this.onItemSelected}
            getData={this.api.getPopular}
        >
            {({title, vote_average}) => (
            <React.Fragment>
                {title}<span className="badge badge-primary badge-pill">{vote_average}</span>
            </React.Fragment>)}
        </ItemList>

        return(
            <div className="container">
                <Header title="The Movie DB"/>
                <RandomMovie/>
                <div className="row">
                    { itemList }
                    <ItemDetails itemId={ selectedItem }/>
                </div>
            </div>
        )
    }
}
