import { useTasks } from "../context/TaskContext"

const SearchBar = () => {
    const { search, setSearch } = useTasks()

    return (
        <input
            placeholder="Buscar tarea..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-1 p-2 rounded border dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-pink-600 dark:border-gray-500"
        />
    )
}

export default SearchBar
