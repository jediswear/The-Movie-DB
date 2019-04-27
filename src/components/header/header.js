import React from 'react'
import { Link } from 'react-router-dom'
import './header.scss'

const Header = ({ title }) => {

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
                        <input className="form-control mr-sm-2 search-field" type="text" placeholder="Search" />
                        <button className="btn btn-secondary my-2 my-sm-0 search-btn" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </div>
    )
}

export default Header