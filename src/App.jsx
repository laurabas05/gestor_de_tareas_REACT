import { useTasks } from "./context/TaskContext"
import { useEffect } from "react"
import TaskForm from "./components/TaskForm"
import Column from "./components/Column"
import SearchBar from "./components/SearchBar"
import ThemeToggle from "./components/ThemeToggle"
import { useAuth } from "./context/AuthContext"
import Header from "./components/Header"
import googleOneTap from "google-one-tap"

const App = () => {
  // se extrae el estado user (para saber si hay alguien logueado)
  // y la funcion de login del contexto
  const { user, login } = useAuth()

  // se ejecuta al cargar la web para q aparezca la interfaz de google
  useEffect(() => {
    // si no hay user logeado, le pide el inicio de sesion
    if (!user) {
      googleOneTap({ client_id: "370998042099-oqk1snni2bvvnhr1517p9if58e28fej7.apps.googleusercontent.com" }, (response) => {
        // cuando google devuelve el token JWT, se lo pasa a la funcion login
        login(response)
      })
    }
  }, [user, login])

  // lee darkMode del contexto, si está activado o no
  const { darkMode } = useTasks()

  // si darkMode = true, añade clase dark al html,
  // si darkMode = false, quita el dark al html
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  // todo el contenido visual
  return (
    <div className="min-h-screen p-6 bg-pink-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-[85%] mx-auto mb-20">
        <div className="flex">
          <h1 className="flex-1 text-6xl font-bold mt-6 mb-10">
            <span className="bg-gradient-to-r from-pink-800 to-pink-500 bg-clip-text text-transparent">
              Gestor de Tareas
            </span>
          </h1>
          <Header />
        </div>

        {/* proteccion d rutas: solo mostramos el contenido si hay usuario logueado */}
        {user ? (
          <>
            <TaskForm />

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6">
              <h2 className="text-lg font-bold mb-3">Buscador de tareas</h2>
              <SearchBar />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Column title="Pendientes" status="todo" />
              <Column title="En Progreso" status="progress" />
              <Column title="Completadas" status="done" />
            </div>
          </>
        ) : (
          /* mensaje por si el usuario no esta logeado */
          <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow text-center mt-10">
            <h2 className="text-2xl font-bold mb-2">Acceso Denegado</h2>
            <p className="text-stone-600 dark:text-stone-400">
              Utiliza la ventana de Google para iniciar sesión y acceder al gestor de tareas.
            </p>
          </div>
        )}

        <div className="fixed bottom-4 right-5 z-50">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default App
