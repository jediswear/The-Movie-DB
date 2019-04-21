import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/app'
import ErrorBoundry from './components/error-boundry'
import ApiService from './services/api-service'
import { ApiServiceProvider } from './components/api-service-context'

import store from './store'

const api = new ApiService()
const root = document.getElementById('root')

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <ApiServiceProvider value={api}>
                <Router>
                    <App/>
                </Router>
            </ApiServiceProvider>
        </ErrorBoundry>
    </Provider>,
    root)