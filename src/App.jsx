import { useTasks } from "./context/TaskContext"
import { useEffect } from "react"
import TaskForm from "./components/TaskForm"
import Column from "./components/Column"
import SearchBar from "./components/SearchBar"
import ThemeToggle from "./components/ThemeToggle"

const App = () => {
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

        <h1 className="text-6xl font-bold mt-6 mb-10"><span className="bg-gradient-to-r from-pink-800 to-pink-500 bg-clip-text text-transparent">Gestor de Tareas</span></h1>

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

        <div className="fixed bottom-4 right-5 z-50">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default App
