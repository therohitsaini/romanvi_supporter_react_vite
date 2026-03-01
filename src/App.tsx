import { Fragment } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBarLanding from './components/Header_section/NavBarLanding'
import LandingHome from './components/Pages/LandingHome'
import Home from './components/Home/Home'
import Login from './components/Auth/Login'
import RegisterationForm from './components/Auth/RegisterationForm'
import Onboarding from './components/Pages/Onboarding'
import Dashboard from './components/Pages/DashboardClient'
import Anaylitics from './components/Pages/Anaylitics'
import ChatWidgetSetting from './components/Pages/WidgetSettings'
import OverviewCards from './components/Pages/Overview'
import ChatWidget from './components/Pages/ChatWidget'
import UploadFqa from './components/Pages/UploadFqa'


function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register/n' element={<RegisterationForm />} />
          <Route path='/onboarding' element={<Onboarding />} />
          <Route path="widget/:widgetId" element={<ChatWidget />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<OverviewCards />} />
            <Route path="analytics" element={<Anaylitics />} />
            <Route path="widget" element={<ChatWidgetSetting />} />
            <Route path="upload-fqa" element={<UploadFqa />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
