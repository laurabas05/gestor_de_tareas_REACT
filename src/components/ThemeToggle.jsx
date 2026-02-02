import { useTasks } from "../context/TaskContext"

// componente q representará el botón del modo claro/oscuro
const ThemeToggle = () => {
    const { darkMode, setDarkMode } = useTasks()

    return (
        <button
            // cada vez q se le de click al boton, alternará al valor contrario
            onClick={() => setDarkMode(!darkMode)}
            className="mb-4 px-3 py-2 rounded-full bg-pink-600"
        >
            {darkMode ? "☀️" : "🌙"}
        </button>
    )
}

export default ThemeToggle
