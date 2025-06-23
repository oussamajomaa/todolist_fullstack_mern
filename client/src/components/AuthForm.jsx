import React from 'react'
import { Link } from 'react-router-dom'

export default function AuthForm({ isRegister, handleSubmit, onChangeUsername, onChangeEmail, onChangePassword }) {
    return (
        <form className="w-[460px] p-5 flex flex-col gap-3 shadow-2xl rounded" onSubmit={handleSubmit}>
            <h1 className="text-3xl text-center font-bold">{isRegister ? 'Inscription' : 'Connexion'}</h1>

            {isRegister &&
                <input
                    placeholder="Nom d'utilisateur..."
                    onChange={onChangeUsername}
                    required
                    type="text"
                    className="input input-primary w-full"
                />
            }

            <input
                placeholder="Email..."
                onChange={onChangeEmail}
                required
                type="email"
                className="input input-primary w-full"
            />

            <input
                placeholder="Mot de passe..."
                onChange={onChangePassword}
                required
                type="password"
                className="input input-primary w-full"
            />

            <button className="btn btn-primary">{isRegister ? "S'incrire" : "Se connecter"}</button>
            {isRegister
                ? <Link to={'/'}>Se connecter</Link>
                : <Link to={'/register'}>S'inscrire</Link>
            }


        </form>
    )
}
