import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Admin() {
	const navigate = useNavigate()
	const logout = () => {
		localStorage.clear()
		navigate('/')
	}

	console.log(localStorage.getItem('role'))
	if (localStorage.getItem('role') !=="admin") {
		return <Navigate to={'/'} />
	}
	return (
		<div className='p-5'>
			<h1 className='text-3xl'>Admin dashboard</h1>
			<button onClick={logout} className='btn btn-error'>Logout</button>

		</div>
	)
}
