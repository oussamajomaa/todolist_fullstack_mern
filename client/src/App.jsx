import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Task from './pages/Task'
import Register from './pages/Register'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'
import ActivatedAccount from './pages/ActivatedAccount'

function App() {
	return (
		<BrowserRouter>
		{/* <Navbar /> */}
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/tasks" element={<Task />} />
				<Route path="/register" element={<Register />} />
				<Route path="/activated-account" element={<ActivatedAccount />} />
			</Routes>
			<ToastContainer
				position='top-center'
				autoClose={1500}
			/>
		</BrowserRouter>
	)
}

export default App
