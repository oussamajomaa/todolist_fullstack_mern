import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify'

export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(username, email, password)
        fetch('http://localhost:5000/register', {
            method: "POST",
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({ username, email, password })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === "Un utilisateur a été ajouté") {
                    toast.success(data.message)
                } else {
                    toast.error(data.message || "Erreur lors de l'inscription")
                }
            })
            .catch(() => {
                toast.error("Erreur de connexion au serveur")
            })
    }
    return (
        <div className="h-screen flex justify-center items-center bg-white dark:bg-black">
            <form className="w-[460px] p-5 flex flex-col gap-3 shadow-2xl rounded" onSubmit={handleSubmit}>
                <h1 className="text-3xl text-center font-bold">Inscription</h1>
                <input
                    placeholder="Nom d'utilisateur..."
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    type="text"
                    className="input input-primary w-full" />
                <input
                    placeholder="Email..."
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    className="input input-primary w-full" />
                <input
                    placeholder="Mot de passe..."
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                    className="input input-primary w-full" />
                <button className="btn btn-primary">S'inscrire</button>
            </form>
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    )
}
