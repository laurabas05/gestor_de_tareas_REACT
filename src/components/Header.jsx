import { useAuth } from "../context/AuthContext"
import ThemeToggle from "./ThemeToggle"
import { MdLogout } from "react-icons/md" // para el iconito de cerrar sesion

const Header = () => {
  const { user, logout } = useAuth()

  // se comprueba si el usuario esta logueado o no para
  // que el componente sepa si mostrar el contenido o no.
  if (!user) return null

  return (
    <header className="w-full mb-8">
      <div className="rounded-2xl border border-pink-200/70 dark:border-pink-900/40 bg-white/80 dark:bg-gray-900/70 backdrop-blur-md shadow-lg px-4 md:px-6 py-4">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl md:text-4xl font-black">
            <span className="bg-gradient-to-r from-pink-800 to-pink-500 bg-clip-text text-transparent">
              Gestor de Tareas
            </span>
          </h1>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <div className="h-12 flex items-center gap-2 bg-white dark:bg-gray-800 p-2 pr-3 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
              <img
                src={user.picture}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium text-sm hidden sm:block">
                {user.name}
              </span>
            </div>

            <button
              onClick={logout}
              className="h-12 flex items-center bg-red-300 dark:bg-red-800 p-2 px-3 rounded-full shadow-sm hover:shadow-md border border-red-200 dark:border-red-500 bg-opacity-30 dark:bg-opacity-30"
            >
              <MdLogout size={24} color="#ff4d4d" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
