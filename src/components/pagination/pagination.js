import React, { Component } from 'react'
import './pagination.scss'
import { connect } from "react-redux";
import { setCurrentPage, getMovies } from "../../actions";

class Pagination extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.currentPage !== this.props.currentPage){
                 this.updateMovies()
        }
    }

    updateMovies = () => {
        const { getData, getMovies } = this.props

        getData()
            .then(res => {
                getMovies(res.movies)
            })
    }


    render() {

        const { viewRange, currentPage, setCurrentPage, totalPages } = this.props
        const viewArea = []

        const rangeStart = currentPage - viewRange >= 0 ? currentPage - Math.floor(viewRange / 2) : 1
        let rangeEnd = currentPage - viewRange >= 0 ? currentPage + Math.floor(viewRange / 2) : viewRange

        /**
         * проверка на максимум старниц
         * */
        rangeEnd = +(rangeEnd <= totalPages ? rangeEnd : totalPages) + 1

        for (let i = rangeStart; i < rangeEnd; i++) {
            const isSelected = currentPage === i ? 'current-page' : null
            const res = <div className={ isSelected }  onClick={ () => setCurrentPage(i) } key={i}>{i}</div>

            viewArea.push(res)
        }

        return (
            <div className="pagination">
                {currentPage > 1 ? <div className="prev-page" onClick={ () => setCurrentPage(currentPage - 1)}>
                    <i className="material-icons">
                        arrow_right_alt
                    </i>
                    {'Prev'}
                    </div> : null}
                { viewArea }
                {currentPage < +totalPages ? <div className="next-page" onClick={ () => setCurrentPage(currentPage + 1)}>
                    {'Next'}
                    <i className="material-icons">
                        arrow_right_alt
                    </i>
                </div> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    const { pagination: {currentPage, totalPages }, movies} = state

    return {
        currentPage,
        movies,
        totalPages
    }
}

const mapDispatchToProps = {
    setCurrentPage,
    getMovies
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)