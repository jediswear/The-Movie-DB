import moment from 'moment'

export default class ApiService {
    _apiKey = '393b5af8e8c1ec5b8656986c69e3e727'

    _baseUrl = `https://api.themoviedb.org/3/`

    _imageBase = `https://image.tmdb.org/t/p/`

    _token = window.localStorage.request_token

    _objectToParams(obj) {
        obj.apikey = this._apiKey
        const keys = Object.keys(obj)
        const params = keys.map(el => `${el}=${obj[el]}`)

        return params.reduce((total, el) => `${total}&${el}`)
    }

    _buildUrl(params) {
        return `${this._baseUrl}/?${this._objectToParams(params)}`
    }

    _keysToLowerCase(obj){
        const keys = Object.keys(obj)
        const newObj = {}

        keys.forEach((el, i) => newObj[el.toLowerCase()] = obj[el])

        return newObj
    }

    async getResource(method) {

        const res = await fetch(`${this._baseUrl}${method}?api_key=${this._apiKey}`)

        if(!res.ok){
            throw new Error('Something goes wrong')
        }

        return await res.json()
    }

    async getById(id){
        const res = await this.getResource(`movie/${id}`)
        return this._transformMovieData(res)
    }

    _getPosterPath(imgPath){
        return `${this._imageBase}w500${imgPath}`
    }

    _transformMovieData({ id, title, release_date, genres, poster_path}){
        return {
            id,
            title,
            year: moment(release_date).format('YYYY'),
            genres,
            poster: this._getPosterPath(poster_path)
        }
    }

    async registerToken(){
        const url = `https://www.themoviedb.org/authenticate/${window.localStorage.request_token}`
        window.open(url,'_blank');
    }

    async getToken() {
        const auth = await fetch(`${this._baseUrl}authentication/token/new?api_key=${this._apiKey}`)
        const data = await auth.json()
        window.localStorage.request_token = data.request_token
        console.log(data.request_token);
    }

    async newSession(){

        /*const obj = {
            method: 'POST',
            headers: JSON.stringify({
                'request_token': window.localStorage.request_token
            })
        }*/

        const res = await fetch(`${this._baseUrl}authentication/session/new?api_key=${this._apiKey}`)
        /*res.json()
            .then(res => {
                console.log(res);
            })*/
    }
}
