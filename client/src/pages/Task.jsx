import { useEffect, useState } from "react"
import { IoLogOut } from "react-icons/io5";
import { RiAddLargeLine } from "react-icons/ri";
import { Navigate, useNavigate } from "react-router-dom";
import Item from "../components/Item";
import TaskModal from "../components/TaskModal";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'


const API_URL = import.meta.env.VITE_API_URL

export default function Task() {
	const navigate = useNavigate();

	// États pour gérer les tâches, le formulaire, etc.
	const [tasks, setTasks] = useState([]);
	const [title, setTitle] = useState('');
	const [isChecked, setIsChecked] = useState(false);
	const [id, setId] = useState('');
	const [isEdit, setIsEdit] = useState(false);
	const [headline, setHeadline] = useState('');

	// Récupération du token JWT depuis le localStorage
	const token = localStorage.getItem('token');
	// Fonction pour récupérer toutes les tâches
	const fetchTasks = async () => {
		const response = await fetch(`${API_URL}/task`, {
			// headers: {
			// 	'Authorization': `Bearer ${token}`
			// },
			credentials: 'include'
		});
		if (response.ok) {
			const data = await response.json();
			setTasks(data);
		}
	};

	// Récupère les tâches au chargement du composant
	useEffect(() => {
		fetchTasks();
	}, []);

	// Supprime une tâche spécifique
	const handleDelete = async (id) => {
		const response = await fetch(`${API_URL}/task/${id}`, {
			method: 'DELETE',
			// headers: {
			// 	'Authorization': `Bearer ${token}`
			// }
			credentials: 'include',
		});
		if (response.ok) {
			const data = await response.json();
			console.log(data);
			fetchTasks(); // Met à jour la liste après suppression
			// toast.warning(data.message)

		}
	};

	// Déconnexion de l'utilisateur
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


	// Ajout ou mise à jour d'une tâche
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isEdit) {
			// Mise à jour d'une tâche
			const response = await fetch(`${API_URL}/task/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'Application/json',
					// 'Authorization': `Bearer ${token}`
				},
				credentials: 'include',
				body: JSON.stringify({ title, status: isChecked })
			});
			const data = await response.json();
			if (response.ok) {
				console.log(data);
				fetchTasks();
				// toast.success(data.message)
				Swal.fire('La tâche a été modifiée', '', 'info')
			} else {
				toast.error(data.message)
			}
		} else {
			// Création d'une nouvelle tâche
			const response = await fetch(`${API_URL}/task`, {
				method: 'POST',
				headers: {
					'Content-Type': 'Application/json',
					// 'Authorization': `Bearer ${token}`
				},
				credentials: 'include',
				body: JSON.stringify({ title })
			});
			const data = await response.json();
			if (response.ok) {
				console.log(data);
				setTitle('');
				fetchTasks();
				toast.success(data.message)
			} else {
				toast.error(data.message)
			}
		}

		// Ferme la modal après soumission
		document.getElementById('my_modal_3').close();
	};

	// Pré-remplit la modal pour la modification
	const handleUpdate = (task) => {
		setIsChecked(task.status);
		setTitle(task.title);
		setId(task._id);
		setIsEdit(true);
		setHeadline('Modifier une tâche');
		document.getElementById('my_modal_3').showModal();
	};

	// Ouvre la modal pour l'ajout
	const handleAdd = () => {
		document.getElementById('my_modal_3').showModal();
		setHeadline('Ajouter une nouvelle tâche');
		setIsEdit(false);
		setTitle('');
	};

	// // Redirige si l'utilisateur n'est pas connecté
	// if (!token) {
	// 	return <Navigate to={'/'} />;
	// }

	return (
		<div className="w-[460px] m-auto p-5 rounded mt-5">
			{/* Header avec infos utilisateur et bouton déconnexion */}
			<div className="bg-slate-500 h-16 mb-3 text-white p-4 rounded flex justify-between items-center">
				<p>{localStorage.getItem('username')} - {localStorage.getItem('role')}</p>
				<button className="btn btn-square" onClick={handleLogout}>
					<IoLogOut size={24} />
				</button>
			</div>

			{/* Titre + bouton d'ajout */}
			<div className="flex justify-between">
				<h1 className="text-3xl text-center my-3">Liste de tâches</h1>
				<button className="btn btn-square" onClick={handleAdd}>
					<RiAddLargeLine size={24} color="blue" />
				</button>
			</div>

			{/* Affichage de la liste des tâches */}
			{tasks.map(task =>
				<Item
					key={task._id}
					task={task}
					handleDelete={() => handleDelete(task._id)}
					handleUpdate={() => handleUpdate(task)} />
			)}

			{/* Modal pour ajouter / modifier une tâche */}
			<TaskModal
				headline={headline}
				handleSubmit={handleSubmit}
				title={title}
				onChangeTitle={(e) => setTitle(e.target.value)}
				isChecked={isChecked}
				onChangeStatus={(e) => setIsChecked(e.target.checked)}
				isEdit={isEdit}
			/>
		</div>
	);
}
