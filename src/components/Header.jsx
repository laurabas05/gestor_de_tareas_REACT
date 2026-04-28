import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import ThemeToggle from "./ThemeToggle"
import { MdLogout } from "react-icons/md" // para el iconito de cerrar sesion

const Header = () => {
    const { user, logout } = useAuth()

    // se comprueba si el usuario esta logueado o no para
    // que el componente sepa si mostrar el contenido o no.
    if (!user) return null;

    return (
        <header className="flex justify-end items-center p-4 relative">
            <div className="flex">
                <button className="flex">
                    <ThemeToggle />
                </button>
                <button
                    className="flex items-center gap-3 bg-white dark:bg-gray-800 p-2 pr-4 rounded-full shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 mx-2"
                    >
                    <img
                        src={user.picture}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="font-medium text-sm hidden sm:block">
                        {user.name}
                    </span>
                </button>
                <button onClick={() => {
                    logout();
                    }} 
                    className="flex items-center bg-red-300 dark:bg-red-800 p-2 px-3 rounded-full shadow-sm hover:shadow-md border border-red-200 dark:border-red-500 bg-opacity-30 dark:bg-opacity-30">
                    <MdLogout size={24} color="#ff4d4d" />
                </button>
            </div>
        </header>
    )
}

export default Header