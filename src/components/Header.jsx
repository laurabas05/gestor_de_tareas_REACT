import { useAuth } from "../context/AuthContext"

const Header = () => {
    const { user, logout } = useAuth()

    if (!user) return null;

    return (
        <header className="flex flex-1 justify-between items-center p-4">
            <div className="flex items-center gap-3">
                <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full" />
                <span className="font-bold">{user.name}</span>
            </div>
            <button onClick={logout} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700">Cerrar Sesión</button>
        </header>
    )
}

export default Header