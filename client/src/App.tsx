
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Dashboard } from './pages/dashboard'
import { Auth } from './pages/auth'

function App() {
 

  return (
    <BrowserRouter>
      <div className='app-container'>
        <Routes>
          <Route path='/' element={<Dashboard/>}></Route>
          <Route path='/auth' element={<Auth/>}></Route>
        </Routes> 
      </div>
      
    </BrowserRouter>
  )
}

export default App
