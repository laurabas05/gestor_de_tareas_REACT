import { useForm } from "../hooks/useForm"
import { useTasks } from "../context/TaskContext"

const TaskForm = () => {
    const { addTask } = useTasks()

    // custom hook. 
    const { values, handleChange, resetForm } = useForm({
        title: "",
        description: "",
        priority: "Media"
    })

    // cuando pulsas el boton de añadir tarea
    const handleSubmit = (e) => {
        e.preventDefault()

        // se 'forma' la tarea
        const newTask = {
            id: Date.now(), // id unico
            ...values, // copia título, descripción y prioridad
            status: "todo" // por defecto estado 'pendiente'
        }

        addTask(newTask) // manda la tarea al contexto
        resetForm() // limpia el formulario
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6">
            <h2 className="text-lg font-bold mb-3">Nueva tarea</h2>

            <input
                type="text"
                name="title"
                placeholder="Título"
                value={values.title}
                onChange={handleChange}
                className="w-full mb-2 p-2 rounded border dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-pink-600 dark:border-gray-500"
                required
            />

            <textarea
                name="description"
                placeholder="Descripción"
                value={values.description}
                onChange={handleChange}
                className="w-full mb-2 p-2 rounded border dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-pink-600 dark:border-gray-500 resize-none"
            />

            <select
                name="priority"
                value={values.priority}
                onChange={handleChange}
                className="w-full mb-2 p-2 rounded border dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-pink-600 dark:border-gray-500"
            >
                <option>Alta</option>
                <option>Media</option>
                <option>Baja</option>
            </select>

            <button className="w-full bg-pink-600 text-white mt-4 py-2 rounded hover:bg-pink-700">Añadir tarea</button>
        </form>
    )
}

export default TaskForm
