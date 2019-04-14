import React from 'react'
import ApiService from '../../services/api-service'

const Header = ({ title }) => {

    const api = new ApiService()

    return (
        <div>
            <nav className="col-12 navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="#">{ title }</a>
                {/*<button type="button" className="btn btn-primary" onClick={ () => api.getToken() }>Get token</button>*/}
                {/*<button type="button" className="btn btn-primary" onClick={ () => api.registerToken() }>Register</button>*/}
                {/*<button type="button" className="btn btn-primary" onClick={ () => api.newSession() }>New session</button>*/}
                <div className="collapse navbar-collapse justify-content-end" id="navbarColor03">
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                        <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </div>
    )
}

export default Header