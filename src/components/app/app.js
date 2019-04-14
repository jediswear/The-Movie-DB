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


    render(){

        const { selectedItem } = this.state

        return(
            <div className="container">
                <Header title="The Movie DB"/>
                <RandomMovie/>
                <div className="row">
                    <ItemList onSelected={ this.onItemSelected } getData={ this.api.getPopular }/>
                    <ItemDetails itemId={ selectedItem }/>
                </div>
            </div>
        )
    }
}
