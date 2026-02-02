import { useTasks } from "../context/TaskContext"

const ThemeToggle = () => {
    const { darkMode, setDarkMode } = useTasks()

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="mb-4 px-3 py-1 rounded-full bg-pink-600"
        >
            {darkMode ? "☀️" : "🌙"}
        </button>
    )
}

export default ThemeToggle
