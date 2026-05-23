import { useTasks } from "./context/TaskContext"
import { useEffect } from "react"
import TaskForm from "./components/TaskForm"
import Column from "./components/Column"
import SearchBar from "./components/SearchBar"
import ThemeToggle from "./components/ThemeToggle"
import { useAuth } from "./context/AuthContext"
import Header from "./components/Header"

const App = () => {
  // se extrae el estado user (para saber si hay alguien logueado)
  // y la funcion de login del contexto
  const { user, login } = useAuth()
  // id del cliente oauth de google
  const googleClientId = "370998042099-oqk1snni2bvvnhr1517p9if58e28fej7.apps.googleusercontent.com"

  // esta funcion solo lanza el one-tap
  const promptOneTap = () => {
    // si la api de google aun no esta lista, no hace nada
    if (!window.google?.accounts?.id) return
    window.google.accounts.id.prompt()
  }

  // se ejecuta al cargar la web para q aparezca la interfaz de google
  useEffect(() => {
    // si no hay user logeado, le pide el inicio de sesion
    if (user) return

    // si la api de google no esta lista, no hace nada
    if (!window.google?.accounts?.id) return

    // configuro One-Tap con el id del cliente y la funcion callback que se ejecuta al iniciar sesion
    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: (response) => {
        // cuando google devuelve el token JWT, se lo pasa a la funcion login
        login(response)
      },
    })

    // muestra el One-Tap
    promptOneTap()
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
          /* pantalla inicial cuando el usuario no esta logeado */
          <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(244,114,182,0.22)_0%,transparent_40%),radial-gradient(circle_at_80%_10%,rgba(236,72,153,0.25)_0%,transparent_42%),radial-gradient(circle_at_70%_80%,rgba(217,70,239,0.2)_0%,transparent_45%)]" />
            <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-pink-400/20 blur-3xl animate-pulse" />
            <div className="absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl animate-pulse" />

            <div className="relative z-10 w-full text-center px-4">
              <p className="mb-4 text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-pink-700 dark:text-pink-300">
                Laura Barrero Sánchez - 2º DAW
              </p>
              <h2 className="text-5xl md:text-7xl font-black leading-tight mb-4">
                <span className="bg-gradient-to-r from-pink-700 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
                  Gestor de Tareas
                </span>
              </h2>
              <p className="text-stone-700 dark:text-stone-300 text-lg md:text-2xl mb-8 max-w-2xl mx-auto">
                Organiza tu día, mantiene foco y completa tareas sin fricción.
              </p>

              <button
                type="button"
                onClick={promptOneTap}
                className="group inline-flex items-center gap-3 rounded-full bg-black text-white dark:bg-white dark:text-black px-7 py-3.5 text-base md:text-lg font-bold shadow-xl hover:scale-[1.02] active:scale-100 transition"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-black">
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                    className="h-4 w-4"
                  />
                </span>
                Continuar con Google
              </button>

              <p className="mt-5 text-sm text-stone-600 dark:text-stone-400">
                Si no aparece el pop-up, pulsa el botón.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
