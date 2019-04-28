import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import {withApiService} from "../hoc";
import { getMoviesBySearch } from '../../actions'
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap'
import './header.scss'

class Header extends Component {

    onBlur = (e) => {
        e.target.value = ''
    }

    onSelect = (e) => {
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
                <NavBar
                    title={ title }
                    onSearch={ (e) => this.onSearch(e) }
                    onBlur={(e) => this.onBlur(e) }
                    onSelect={(e) => this.onSelect(e) }
                    searchResults={ searchResults }
                />
            </div>
        )
    }
}

const NavBar = ({ onSearch, onBlur, onSelect, searchResults, title }) => {
    return(
        <Navbar className="container navbar-dark" expand="lg">
            <Link className="navbar-brand" to="/">{ title }</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link className="nav-link" to="/popular">Popular</Link>
                    <Link className="nav-link" to="/top_rated">Top rated</Link>
                    <Link className="nav-link" to="/upcoming">Upcoming</Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="search-field"
                                 onChange={(e) => onSearch(e) }
                                 onBlur={(e) => onBlur(e)}
                    />
                    <SearchResults searchResults={ searchResults } onSelect={onSelect}/>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

const SearchResults = ({ searchResults, onSelect }) => {

    const items = searchResults.map((item) => {

        const { id } = item

        return (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={ id } onClick={onSelect}>
                <ListItem movie={ item }/>
            </li>
        )
    })

    return (
        <div className="search-results">
            <ul className="list-group list-menu">
                { items }
            </ul>
        </div>
    )
}

const ListItem = ({ movie: { title, rating, id } }) => {

    return (
        <Link className="list-link" to={`/movie/${id}`} >
            { title }
            <span className="badge badge-primary badge-pill">{ rating }</span>
        </Link>
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