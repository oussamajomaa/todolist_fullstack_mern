import {jwtDecode}  from "jwt-decode"
import { useState } from "react"
import { useNavigate, Link, Navigate } from "react-router-dom"



export default function Login() {
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async(e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/login', {
            method:'POST',
            headers:{
                'Content-Type':'Application/json'
            },
            body: JSON.stringify({email,password})
        })
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            localStorage.setItem('email',data.email)
            localStorage.setItem('role',data.role)
            localStorage.setItem('token',data.token)
            // const payload = jwtDecode(data)
            // console.log(payload)
            navigate('/tasks')
        }
    }

    if (localStorage.getItem('token')) {
        return <Navigate to={'/tasks'} />
    }
    
  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-[460px] flex flex-col gap-3 p-5 rounded shadow-2xl">
        <h1 className="text-center text-3xl font-bold">Connexion</h1>
        <input
            placeholder="Email..."
            className="input input-primary w-full"
            onChange={(e) => setEmail(e.target.value)}
            type="email" />
        <input
            placeholder="Mot de passe..."
            className="input input-primary w-full"
            onChange={(e) => setPassword(e.target.value)}
            type="password" />
        <button className="btn btn-primary">Se connecter</button>
        <Link to={'/register'}>Créer un compte</Link>
      </form>
    </div>
  )
}
