import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'

export default function Register() {
    const navigate = useNavigate();

    // États pour les champs du formulaire
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Fonction appelée lors de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        // Envoi des données d'inscription au backend
        fetch('http://localhost:5000/register', {
            method: "POST",
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({ username, email, password }) // Données envoyées
        })
            .then(res => res.json())
            .then(data => {
                // Vérifie si l'inscription a réussi
                if (data.message === "Un utilisateur a été ajouté") {
                    toast.success(data.message); // Affiche un message de succès
                    navigate('/'); // Redirige vers la page de connexion
                } else {
                    // Affiche une erreur si l'inscription a échoué
                    toast.error(data.message || "Erreur lors de l'inscription");
                }
            })
            .catch(() => {
                // Affiche une erreur si le serveur ne répond pas
                toast.error("Erreur de connexion au serveur");
            });
    };

    return (
        <div className="h-screen flex justify-center items-center bg-white dark:bg-black">
            {/* Formulaire d'inscription */}
            <form className="w-[460px] p-5 flex flex-col gap-3 shadow-2xl rounded" onSubmit={handleSubmit}>
                <h1 className="text-3xl text-center font-bold">Inscription</h1>

                {/* Champ pour le nom d'utilisateur */}
                <input
                    placeholder="Nom d'utilisateur..."
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    type="text"
                    className="input input-primary w-full"
                />

                {/* Champ pour l'email */}
                <input
                    placeholder="Email..."
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    className="input input-primary w-full"
                />

                {/* Champ pour le mot de passe */}
                <input
                    placeholder="Mot de passe..."
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                    className="input input-primary w-full"
                />

                {/* Bouton pour valider l'inscription */}
                <button className="btn btn-primary">S'inscrire</button>

                {/* Lien vers la page de connexion */}
                <Link to={'/'}>Se connecter</Link>
            </form>

            {/* Conteneur des notifications toast */}
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
}
