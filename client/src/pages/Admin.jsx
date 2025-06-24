import { Navigate, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { IoLogOut } from "react-icons/io5";
import { useEffect, useState, useRef } from 'react';
import { BsTrash2 } from "react-icons/bs";
import { CgDanger } from "react-icons/cg";
import { toast } from 'react-toastify';


const API_URL = import.meta.env.VITE_API_URL

export default function Admin() {
	const modal = useRef()
	const [users, setUsers] = useState([])
	const [selectedUser, setSelectedUser] = useState(null)
	const navigate = useNavigate()
	const token = localStorage.getItem('token')
	// if (!token) {
	// 	return <Navigate to="/" />
	// }

	// let decode
	// try {
	// 	decode = jwtDecode(token)
	// } catch (err) {
	// 	console.error("Invalid token:", err)
	// 	return <Navigate to="/" />
	// }

	// if (!decode || decode.role !== 'admin') {
	// 	return <Navigate to="/" />
	// }

	const fetchUser = async () => {
		const response = await fetch(`${API_URL}/admin/user`, {
			credentials: 'include'
			// headers: {
			// 	'Authorization': `Bearer ${token}`
			// }
		})
		if (!response.ok) {

		} else {
			const data = await response.json()
			setUsers(data)
		}
	}

	useEffect(() => {
		fetchUser()
	}, [])

	const handleLogout = async () => {
		const response = await fetch(`${API_URL}/logout`, {
			method: 'POST',
			credentials: 'include' // ⬅️ important pour envoyer le cookie
		});

		if (response.ok) {
			// Nettoyage éventuel de localStorage si tu y mets d'autres choses
			localStorage.clear()
			navigate('/') // ou redirection vers la page de login
		} else {
			const data = await response.json()
			console.error('Erreur de déconnexion', data)
		}
	}


	const confirmDelete = (id) => {
		setSelectedUser(id)
		// document.getElementById('delete_confirm').showModal()
		modal.current.showModal()
	}

	const handleDelete = async () => {
		const response = await fetch(`${API_URL}/admin/user/${selectedUser}`, {
			method: 'DELETE',
			// headers: {
			// 	'Authorization': `Bearer ${token}`
			// }
			credentials: 'include'
		})
		const data = await response.json()
		if (!response.ok) {
			toast.success(data.message)
		} else {
			toast.success(data.message)
			fetchUser()
		}
	}


	return (
		<div className='p-5'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl font-bold'>Admin Dashboard</h1>
				<button className='btn btn-warning' onClick={handleLogout}><IoLogOut size={24} /></button>
			</div>
			<table className='table'>
				<thead>
					<tr className='text-xl'>
						<th>Username</th>
						<th>Email</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{users.filter(user => user.email !== localStorage.getItem('email'))
						.map(user => (
							<tr key={user._id}>
								<td>{user.username}</td>
								<td>{user.email}</td>
								<td><button className='btn btn-square' onClick={() => confirmDelete(user._id)}>
									<BsTrash2 size={20} color='red' />
								</button></td>
							</tr>
						))}
				</tbody>
			</table>
			{/* Open the modal using document.getElementById('ID').showModal() method */}
			<dialog id="delete_confirm" className="modal" ref={modal}>
				<div className="modal-box">
					<CgDanger size={36} color='red' />
					<p className="py-4">Êtes-vous sûr de supprimer l'utilisateur?</p>
					<div className="modal-action">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button className="btn" onClick={() => document.getElementById('delete_confirm').close()}>Annuler</button>
							<button
								className="btn btn-error"
								onClick={handleDelete}>Confirmer</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	)
}
