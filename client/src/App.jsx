import { useState } from 'react'


import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Task from './pages/Task'
import Register from './pages/Register'
import AccountActivated from './pages/AccountActivated'
import Admin from './pages/Admin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account-activated" element={<AccountActivated />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
