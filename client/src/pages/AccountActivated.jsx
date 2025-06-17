import { useNavigate } from "react-router-dom"
export default function AccountActivated() {
    const navigate = useNavigate()
    const login = () => {
        navigate('/login')
    }
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-success">Compte activé avec succès !</h1>
        <p className="mt-2">Vous pouvez maintenant vous connecter.</p>
        <button onClick={login} className="my-2 btn btn-outline btn-success btn-sm">Se connecter</button>
      </div>
    </div>
  )
}
