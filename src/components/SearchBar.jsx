import { useTasks } from "../context/TaskContext"

const SearchBar = () => {
    const { search, setSearch } = useTasks()

    return (
        <input
            placeholder="Buscar tarea..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-4 p-2 rounded border dark:bg-gray-700"
        />
    )
}

export default SearchBar
