import { useTasks } from "../context/TaskContext"

const ThemeToggle = () => {
    const { darkMode, setDarkMode } = useTasks()

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="mb-4 px-3 py-1 rounded bg-gray-300 dark:bg-gray-700"
        >
            {darkMode ? "☀ Claro" : "🌙 Oscuro"}
        </button>
    )
}

export default ThemeToggle
