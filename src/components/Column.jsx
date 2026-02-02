import { useTasks } from "../context/TaskContext"
import TaskCard from "./TaskCard"

const Column = ({ title, status }) => {
    // se recibe la lista de tareas
    const { tasks, search, moveTask } = useTasks()

    const handleDrop = (e) => {
        const id = e.dataTransfer.getData("taskId")
        moveTask(Number(id), status)
    }

    // devuelve la columna dibujada
    return (
        <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className="bg-gray-200 dark:bg-gray-800 p-4 rounded-xl w-full">
            <h3 className="font-bold mb-3">{title}</h3>

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
