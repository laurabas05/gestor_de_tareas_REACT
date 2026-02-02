import { useTasks } from "../context/TaskContext"

// componente q representa la barra de búsqueda
const SearchBar = () => {
    const { search, setSearch } = useTasks()

    return (
        <input
            placeholder="Buscar tarea..."
            value={search}
            // cada vez que se escribe, se guarda en search y se actualiza el context
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-1 p-2 rounded border dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-pink-600 dark:border-gray-500"
        />
    )
}

export default SearchBar
