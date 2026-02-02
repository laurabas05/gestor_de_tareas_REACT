import { useTasks } from "./context/TaskContext"
import { useEffect } from "react"
import TaskForm from "./components/TaskForm"
import Column from "./components/Column"
import SearchBar from "./components/SearchBar"
import ThemeToggle from "./components/ThemeToggle"

const App = () => {
  const { darkMode } = useTasks()

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Gestor de Tareas</h1>

      <ThemeToggle />
      <SearchBar />
      <TaskForm />

      <div className="grid md:grid-cols-3 gap-4">
        <Column title="Pendientes" status="todo" />
        <Column title="En Progreso" status="progress" />
        <Column title="Completadas" status="done" />
      </div>
    </div>
  )
}

export default App
