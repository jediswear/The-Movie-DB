import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import {withApiService} from "../hoc";
import { getMoviesBySearch } from '../../actions'
import './header.scss'

class Header extends Component {

    onBlur(e){

        e.target.value = ''

        this.updateSearch('')
    }

    onSearch(e){
        const query = e.target.value

        this.updateSearch(query)
    }

    updateSearch(query){
        const { apiService, getMoviesBySearch } = this.props

        if (query === ''){
            getMoviesBySearch([])
            return
        }

        apiService
            .getBySearch(query)
            .then(res => {
                getMoviesBySearch(res)
            })
    }

    render() {
        const { title, searchResults } = this.props

        return (
            <div className="header">
                <nav className="container navbar navbar-expand-lg navbar-dark">
                    <Link className="navbar-brand" to="/">{ title }</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarColor03">

                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item" id="nav-popular">
                                <Link className="nav-link" to="/popular">Popular<span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item" id="nav-top">
                                <Link className="nav-link" to="/top_rated">Top rated</Link>
                            </li>
                            <li className="nav-item" id="nav-upcoming">
                                <Link className="nav-link" to="upcoming">Upcoming</Link>
                            </li>
                        </ul>

                        {/*<button type="button" className="btn btn-primary" onClick={ () => api.getToken() }>Get token</button>*/}
                        {/*<button type="button" className="btn btn-primary" onClick={ () => api.registerToken() }>Register</button>*/}
                        {/*<button type="button" className="btn btn-primary" onClick={ () => api.newSession() }>New session</button>*/}


                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control search-field"
                                   type="text"
                                   placeholder="Search"
                                   onChange={(e) => this.onSearch(e) }
                                   onBlur={(e) => this.onBlur(e)}
                            />
                            <SearchResults searchResults={ searchResults } />
                            {/*<button className="btn btn-secondary my-2 my-sm-0 search-btn" type="submit">Search</button>*/}
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}

const SearchResults = ({ searchResults }) => {

    // console.log(searchResults);

    const items = searchResults.map((item) => {

        const { id } = item

        return (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={ id }>
                <ListItem movie={ item }/>
            </li>
        )
    })

    return (
        <div className="search-results">
            <ul className="list-group">
                { items }
            </ul>
        </div>
    )
}

const ListItem = ({ movie: { title, rating } }) => {



    return (
        <React.Fragment>
            { title }
            <span className="badge badge-primary badge-pill">{ rating }</span>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {

    const { searchResults } = state

    return {
        searchResults
    }
}

const mapDispatchToProps = {
    getMoviesBySearch
}

export default withApiService()(connect(mapStateToProps, mapDispatchToProps)(Header))