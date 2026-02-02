import { useTasks } from "../context/TaskContext"

// colores para cada prioridad
const colors = {
    Alta: "border-red-500",
    Media: "border-yellow-500",
    Baja: "border-green-500"
}

const TaskCard = ({ task }) => {
    // se reciben las acciones de borrar y mover tarea
    const { deleteTask, moveTask } = useTasks()

    // cuando empiezas a arrastrar la tarjeta
    const handleDragStart = (e) => {
        // guardamos el id para recuperarlo en la columna
        // y cambiar el estado al soltar
        e.dataTransfer.setData("taskId", task.id)
    }

    // draggable: permite arrastrar
    // onDragStart: aplica la lógica
    return (
        <div draggable onDragStart={handleDragStart} className={`bg-pink-100 dark:bg-gray-700 p-3 mb-3 rounded border-l-4 ${colors[task.priority]}`}>
            <h4 className="font-semibold">{task.title}</h4>
            <p className="text-sm opacity-80">{task.description}</p>

            <div className="justify-between mt-2">
                <span className="text-xs">Prioridad: {task.priority}</span>
                <div className="space-x-2 text-right">
                    {/* los botones se muestran según el estado, menos el de borrar,
                    que es siempre estático */}
                    {task.status !== "todo" && (
                        <button onClick={() => moveTask(task.id, "todo")}
                            className="dark:bg-gray-500/50 bg-pink-200 py-1 px-3 rounded-full shadow transition-transform duration-300 hover:-translate-y-1">⬅️</button>
                    )}

                    {task.status === "todo" && (
                        <button onClick={() => moveTask(task.id, "progress")}
                            className="dark:bg-gray-500/50 bg-pink-200 py-1 px-3 rounded-full shadow transition-transform duration-300 hover:-translate-y-1">➡️</button>
                    )}

                    {task.status === "progress" && (
                        <button onClick={() => moveTask(task.id, "done")}
                            className="dark:bg-gray-500/50 bg-pink-200 py-1 px-3 rounded-full shadow transition-transform duration-300 hover:-translate-y-1">✅</button>
                    )}
                    <button onClick={() => deleteTask(task.id)}
                        className="dark:bg-gray-500/50 bg-pink-200 py-1 px-3 rounded-full shadow transition-transform duration-300 hover:-translate-y-1">Eliminar</button>
                </div>
            </div>
        </div>
    )
}

export default TaskCard
