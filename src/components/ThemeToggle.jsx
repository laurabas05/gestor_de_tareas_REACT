import { useTasks } from "../context/TaskContext"
import { VscColorMode } from "react-icons/vsc" // iconito de modo claro/oscuro

// componente q representará el botón del modo claro/oscuro
const ThemeToggle = () => {
    const { darkMode, setDarkMode } = useTasks()

    return (
        <button
            // cada vez q se le de click al boton, alternará al valor contrario
            onClick={() => setDarkMode(!darkMode)}
            className="h-12 flex items-center bg-white dark:bg-gray-800 rounded-full p-2 px-3 shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700"
        >
            {darkMode ? <VscColorMode size={24} color="#fff" /> : <VscColorMode size={24} color="#000" />}
        </button>
    )
}

export default ThemeToggle
