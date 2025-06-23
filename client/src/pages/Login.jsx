import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import AuthForm from "../components/AuthForm";
import { toast } from "react-toastify";


const API_URL = import.meta.env.VITE_API_URL
export default function Login() {
	// États pour les champs du formulaire
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// Hook de navigation pour rediriger après connexion
	const navigate = useNavigate();

	// Fonction appelée lors de la soumission du formulaire
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Envoi de la requête POST au backend
		const response = await fetch(`${API_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'Application/json'
			},
			body: JSON.stringify({ email, password }) // Données envoyées au serveur
		});

		const data = await response.json();
		if (response.ok) {
			// Réponse réussie : on récupère les données

			// Stockage des informations utiles dans le localStorage
			localStorage.setItem('email', data.email);
			localStorage.setItem('role', data.role);
			localStorage.setItem('token', data.token);
			localStorage.setItem('username', data.username);

			// Redirection en fonction du rôle
			if (data.role === 'user') navigate('/tasks');
			if (data.role === 'admin') navigate('/admin');
		} else {
			console.log(data)
			toast.error(data.message)
		}
	};

	const inputs = [
		{ name: "email", type: "email", placeholder: "Email..." },
		{ name: "password", type: "password", placeholder: "Mot de passe..." }
	]
	return (
		<div className="h-screen flex justify-center items-center">
			
			<AuthForm 
				title={'Connexion'}
				handleSubmit={handleSubmit}
				onChangeEmail={(e)=> setEmail(e.target.value)}
				onChangePassword={(e)=> setPassword(e.target.value)}
			/>
		</div>
	);
}
