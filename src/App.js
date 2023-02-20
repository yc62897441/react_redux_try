import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './containers/HomwPage.jsx'
import PageA from './containers/PageA.jsx'
import Weather from './containers/Weather.jsx'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/pageA" element={<PageA />}></Route>
                <Route path="/weather" element={<Weather />}></Route>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="*" element={<HomePage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
