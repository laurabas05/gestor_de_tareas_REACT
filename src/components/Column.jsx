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
        <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className="bg-pink-200 dark:bg-gray-800 p-4 rounded-xl w-full shadow-lg">
            <h3 className="font-bold text-[18px]">{title}</h3>
            <hr class="my-2 h-0.5 border-t-0 bg-pink-600/50" />

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
