import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import AuthForm from "../components/AuthForm";

const API_URL = import.meta.env.VITE_API_URL
export default function Register() {
    const navigate = useNavigate();

    // États pour les champs du formulaire
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Fonction appelée lors de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        // Envoi des données d'inscription au backend
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({ username, email, password }) // Données envoyées
        })
        if (!response.ok) {
            console.log(response);
        } else {
            toast.success(response.statusText);
            // navigate('/')
        }

    };

    return (
        <div className="h-screen flex justify-center items-center bg-white dark:bg-black">
            
            <AuthForm 
                isRegister={true}
                
                handleSubmit={handleSubmit}
                onChangeUsername={(e) => setUsername(e.target.value)}
                onChangeEmail={(e) => setEmail(e.target.value)}
                onChangePassword={(e) => setPassword(e.target.value)}/>

            {/* Conteneur des notifications toast */}
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
}
