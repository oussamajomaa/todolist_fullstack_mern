import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

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
		const response = await fetch('http://localhost:5000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'Application/json'
			},
			body: JSON.stringify({ email, password }) // Données envoyées au serveur
		});

		if (response.ok) {
			// Réponse réussie : on récupère les données
			const data = await response.json();

			// Stockage des informations utiles dans le localStorage
			localStorage.setItem('email', data.email);
			localStorage.setItem('role', data.role);
			localStorage.setItem('token', data.token);
			localStorage.setItem('username', data.username);

			// Redirection en fonction du rôle
			if (data.role === 'user') navigate('/tasks');
			if (data.role === 'admin') navigate('/admin');
		}
	};

	return (
		<div className="h-screen flex justify-center items-center">
			{/* Formulaire de connexion */}
			<form onSubmit={handleSubmit} className="w-[460px] flex flex-col gap-3 p-5 rounded shadow-2xl">
				<h1 className="text-center text-3xl font-bold">Connexion</h1>

				{/* Champ de saisie pour l'email */}
				<input
					placeholder="Email..."
					className="input input-primary w-full"
					onChange={(e) => setEmail(e.target.value)}
					type="email"
				/>

				{/* Champ de saisie pour le mot de passe */}
				<input
					placeholder="Mot de passe..."
					className="input input-primary w-full"
					onChange={(e) => setPassword(e.target.value)}
					type="password"
				/>

				{/* Bouton pour soumettre le formulaire */}
				<button className="btn btn-primary">Se connecter</button>

				{/* Lien vers la page de création de compte */}
				<Link to={'/register'}>Créer un compte</Link>
			</form>
		</div>
	);
}
