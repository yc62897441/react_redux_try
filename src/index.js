import React from 'react'
import ReactDom from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

const domContainer = document.querySelector('#root')
const root = ReactDom.createRoot(domContainer)

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)
