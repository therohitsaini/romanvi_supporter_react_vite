import { Fragment } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBarLanding from './components/Header_section/NavBarLanding'
import LandingHome from './components/Pages/LandingHome'
import Home from './components/Home/Home'

function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
