import moment from 'moment'

export default class ApiService {
    _apiKey = '393b5af8e8c1ec5b8656986c69e3e727'

    _baseUrl = `https://api.themoviedb.org/3/`

    _imageBase = `https://image.tmdb.org/t/p/`

    _token = window.localStorage.request_token

    getResource = async (method, params) => {

        const url = this._buildUrl(method, params)

        const res = await fetch(url)

        if(!res.ok){
            throw new Error('Something goes wrong')
        }

        return await res.json()
    }

    async getById(id){
        const res = await this.getResource(`movie/${id}`)
        return this._transformMovieData(res)
    }

    async getGenres(){
        const res = await this.getResource('genre/movie/list')
        window.localStorage.allGenres = JSON.stringify(res.genres)
    }

    getGenreNames(...ids) {
        const genres = JSON.parse(window.localStorage.allGenres)
        const genreIds = [...ids]
        const names = []
        genreIds.forEach(id => {
            const isExist = genres.findIndex(genre => {
                if (id === genre.id) {
                    return genre.name
                }
            })

            if (isExist >= 0) {
                names.push(genres[isExist].name)
            }
        })

        return names
    }

    getNowPlaying = async () => {
        const params = {
            region: 'UA'
        }
        const res = await this.getResource('movie/now_playing', params)
        return await this._transformMovieData(res.results)
    }

    getTopRated = async () => {
        const params = {
            region: 'UA'
        }
        const res = await this.getResource('movie/top_rated', params)
        return await this._transformMovieData(res.results)
    }

    getPopular = async () => {
        const params = {
            region: 'UA'
        }
        const res = await this.getResource('movie/popular', params)
        return await this._transformMovieData(res.results)
    }

    getUpcoming = async () => {
        const params = {
            region: 'UA'
        }
        const res = await this.getResource('movie/upcoming', params)
        return await this._transformMovieData(res.results)
    }



    // async registerToken(){
    //     const url = `https://www.themoviedb.org/authenticate/${window.localStorage.request_token}`
    //     window.open(url,'_blank');
    // }

    // async getToken() {
    //     const auth = await fetch(`${this._baseUrl}authentication/token/new?api_key=${this._apiKey}`)
    //     const data = await auth.json()
    //     window.localStorage.request_token = data.request_token
    //
    //     this.registerToken()
    // }

/*    async newSession(){

        const obj = {
            method: 'POST',
            headers: JSON.stringify({
                'request_token': window.localStorage.request_token
            })
        }

        const res = await fetch(`${this._baseUrl}authentication/session/new?api_key=${this._apiKey}`)
        res.json()
            .then(res => {
                console.log(res);
            })
    }*/

    _objectToParams(obj) {
        const keys = Object.keys(obj)
        const params = keys.map(el => `${el}=${obj[el]}`)

        return params.reduce((total, el) => `${total}&${el}`)
    }

    _buildUrl(method, params = {}) {
        params.api_key = this._apiKey
        return `${this._baseUrl}${method}?${this._objectToParams(params)}`
    }

    _keysToLowerCase(obj){
        const keys = Object.keys(obj)
        const newObj = {}

        keys.forEach((el, i) => newObj[el.toLowerCase()] = obj[el])

        return newObj
    }

    _getPosterPath(imgPath){
        return `${this._imageBase}w500${imgPath}`
    }

    /**
     * агрумент массив
     * трансформирует данные массива фильмов
     * */
    async _transformMovieData(movies){

        /**
         * если нет списка id жанров
         * */
        if (!window.localStorage.allGenres) {
            await this.getGenres()
        }

        /**
         * если аргемент не массив
         * */
        if(!Array.isArray(movies)){
            const temp = []
            temp.push(movies)
            movies = temp
        }


        let formattedData = movies.map((movie) => {

            let { id, title, release_date, genres, genre_ids, poster_path, vote_average, overview} = movie

            /**
             * если нет списка жанров достаем их из id
             * */
            if(!genres){
                genres = this.getGenreNames(...genre_ids)
                genres = genres.join(', ')
            } else {
                genres = genres.map(({ name }) => name).join(', ')
            }

            return {
                id,
                title,
                year: moment(release_date).format('YYYY'),
                genres,
                poster: this._getPosterPath(poster_path),
                rating: vote_average,
                overview
            }
        })

        /**
         * сортировка по рейтигну
         * */
        formattedData = formattedData.sort((a, b) => (a.rating - b.rating)).reverse()

        /**
         * если длинна масива 1 возвращает обьект фильма, иначе массив фильмов
         * */
        return formattedData.length === 1 ? formattedData[0] : formattedData
    }
}
