import { useEffect, useState } from 'react'
import './App.css'
import { useAuthContext } from './hooks/useAuthContext'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'

function App() {

  const { user } = useAuthContext()

  return (
    <>
      {/* <NavBar/> */}
      {/* <Routes>
        <Route path="/" element={user ? <Home/> : <Navigate to="/login"/>}/>
        <Route path="/login" element={user ? <Login/> : <Navigate to="/"/>}/>
        <Route path="/signup" element={user ? <Signup/> : <Navigate to="/"/>}/>
      </Routes> */}
      <Signup/>

    </>
  )
}

export default App
