import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import List from './pages/list/List'
import Hotel from './pages/hotel/Hotel'
import Login from './pages/login/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/hotels' element={<List />} />
      <Route path='/hotels/:id' element={<Hotel />} />
      <Route path='/login' element={<Login />} />
     </Routes>
    </>
  )
}

export default App
