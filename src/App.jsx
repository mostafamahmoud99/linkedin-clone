import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home'
import Header from './Components/Header'
import { useDispatch } from 'react-redux';
import { getUserAuth } from './redux/actions'
import ProtectedRoute from './Components/ProtectedRoute'

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getUserAuth());
  },[])

  return (
    <>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={
        <ProtectedRoute>
          <Header />
          <Home />
        </ProtectedRoute>
      } />
    </Routes>
    </>
  );
}

export default App;
