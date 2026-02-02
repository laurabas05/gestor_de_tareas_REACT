import { useTasks } from "../context/TaskContext"
import TaskCard from "./TaskCard"

const Column = ({ title, status }) => {
    // se recibe la lista de tareas, el texto del buscador
    // y la función q cambia el estado de una tarea (drag&drop)
    const { tasks, search, moveTask } = useTasks()

    // se ejecuta cuando se suelta una tarjeta dentro de esa columna
    const handleDrop = (e) => {
        // se obtiene el id de la tarea
        const id = e.dataTransfer.getData("taskId")
        // se cambia el estado de la tarea al de la columna
        moveTask(Number(id), status)
    }

    // devuelve la columna dibujada
    return (
        // onDrop: ejecuta la lógica de mover tareas
        // onDragOver: permite q se pueda soltar algo en la columna
        <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className="bg-pink-200 dark:bg-gray-800 p-4 rounded-xl w-full shadow-lg">
            <h3 className="font-bold text-[18px]">{title}</h3>
            <hr className="my-2 h-0.5 border-t-0 bg-pink-600/50" />

            {/* 1. se filtra por estado. cada columna se queda con la tarea
            q coincida con su estado. */
            /* 2. se filtra por texto. esto es el buscador.
            ignora mayúsculas y filtra en tiempo real. */
            /* 3. por cada tarea se crea una taskCard con su key única */}
            {tasks
                .filter(t => t.status === status)
                .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
                .map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
        </div>
    )
}

export default Column
