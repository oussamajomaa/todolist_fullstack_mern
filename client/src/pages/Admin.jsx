import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

export default function Admin() {
	const decode = jwtDecode(localStorage.getItem('token'))
	if (decode.role !== 'admin') {
		return <Navigate to={'/'} />
	}
  return (
	<div>
		Dashboard
	</div>
  )
}
