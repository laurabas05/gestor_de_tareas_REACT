import { useState } from "react"
import { useAuth } from "../context/AuthContext"

const Header = () => {
    const { user, logout } = useAuth()

    // estado para controlar la visibilidad del desplegable
    const [isOpen, setIsOpen] = useState(false)

    // se comprueba si el usuario esta logueado o no para
    // que el componente sepa si mostrar el contenido o no.
    if (!user) return null;

    return (
        <header className="flex justify-end items-center p-4 relative">
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-3 bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
                    >
                    <img
                        src={user.picture}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="font-medium text-sm hidden sm:block">
                        {user.name}
                    </span>
                    <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 z-[100]">
                        <button
                            onClick={() => {
                                logout();
                                setIsOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header