import { useEffect, useState } from "react"
import { IoLogOut } from "react-icons/io5";
import { RiAddLargeLine } from "react-icons/ri";
import { Navigate, useNavigate } from "react-router-dom";
import Item from "../components/Item";
import TaskModal from "../components/TaskModal";

const API_URL = import.meta.env.VITE_API_URL
export default function Task() {
	const navigate = useNavigate()
	const [tasks, setTasks] = useState([])
	const [title,setTitle] = useState('')
	const [updatedTitle, setUpdatedTitle] = useState('')
	const [isChecked, setIsChecked] = useState(false)

	const token = localStorage.getItem('token')
	const fetchTasks = async () => {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/task`, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		if (response.ok) {
			const data = await response.json()
			setTasks(data)
		}
	}

	useEffect(() => {
		fetchTasks()
	}, [])

	const handleDelete = async (id) => {
		const response = await fetch(`http://localhost:5000/task/${id}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		if (response.ok) {
			const data = await response.json()
			console.log(data)
			fetchTasks()
		}
	}

	const logout = () => {
		localStorage.clear()
		navigate('/')
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const response = await fetch(`${process.env.REACT_APP_API_URL}/task`,{
			method: 'POST',
			headers:{
				'Content-Type': 'Application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({title})
		})
		if (response.ok) {
			const data = await response.json()
			console.log(data)
			setTitle('')
			fetchTasks()
		}
		document.getElementById('my_modal_3').close()
	}

	const handleUpdate = async(task) => {
		setIsChecked(task.status)
		setUpdatedTitle(task.title)
	}
	if (!token) {
		return <Navigate to={'/'} />
	}

	return (
		<div className="w-[460px] m-auto p-5  rounded mt-5 ">
			<div className="bg-slate-500 h-16 mb-3 text-white p-4 rounded flex justify-between items-center">
				<p>{localStorage.getItem('username')} - {localStorage.getItem('role')}</p>
				<button className="btn btn-square" onClick={logout}><IoLogOut size={24} color="" /></button>
			</div>
			<div className="flex justify-between">
				<h1 className="text-3xl text-center my-3">Liste de tâches</h1>
				<button className="btn btn-square" 
					onClick={() => document.getElementById('my_modal_3').showModal()} >
					<RiAddLargeLine size={24} color="blue" />
				</button>
			</div>
			{tasks.map(task =>
				<Item 
					key={task._id} 
					task={task} 
					handleDelete={()=>handleDelete(task._id)}
					handleUpdate={()=>handleUpdate(task)} />
			)}
			<TaskModal 
				handleSubmit={handleSubmit} 
				title={title} 
				onChange={(e)=>setTitle(e.target.value)} />

			{/* <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <h2 className="text-2xl">Ajouter une nouvelle tâche</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <button type="button"
                        onClick={() => document.getElementById('my_modal_3').close()}
                        className=" btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <input
                        required
                        value={title}
                        placeholder="Saisir le nom de la tâche..."
                        type="text"
                        onChange={(e)=>setTitle(e.target.value)}}
                        className="input input-primary w-full mt-5" />
                    <button className="btn btn-primary">Enregistrer</button>
                </form>
            </div>
        </dialog> */}

		<form className="m-5 p-5 flex lfex-col gap-3">
			<input 
				type="text" 
				value={updatedTitle}
				onChange={(e) => setUpdatedTitle(e.target.value)}
				className="input input-primary w-full"/>
				<input 
					className="checkbox checkbox-neutral"
					type="checkbox" 
					onChange={(e)=>setIsChecked(e.target.checked)}
					checked={isChecked} />
				<button className="btn btn-primary">Enregistrer</button>
		</form>
		</div>
	)
}
