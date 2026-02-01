import { useTasks } from "../context/TaskContext"
import TaskCard from "./TaskCard"

const Column = ({ title, status }) => {
    // se recibe la lista de tareas
    const { tasks } = useTasks()

    const filteredTasks = tasks.filter(task => task.status === status)

    // devuelve la columna dibujada
    return (
        <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-xl w-full">
            <h3 className="font-bold mb-3">{title}</h3>

            {filteredTasks.map(task => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    )
}

export default Column
