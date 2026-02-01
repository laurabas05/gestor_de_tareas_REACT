import { useTasks } from "../context/TaskContext"

const colors = {
    Alta: "border-red-500",
    Media: "border-yellow-500",
    Baja: "border-green-500"
}

const TaskCard = ({ task }) => {
    // se reciben las acciones
    const { deleteTask, moveTask } = useTasks()

    return (
        <div className={`bg-gray-100 dark:bg-gray-700 p-3 mb-3 rounded border-l-4 ${colors[task.priority]}`}>
            <h4 className="font-semibold">{task.title}</h4>
            <p className="text-sm opacity-80">{task.description}</p>
            <span>Prioridad: {task.priority}</span>

            <div className="lex justify-between mt-2">
                <span className="text-xs">{task.priority}</span>
                <div className="space-x-1">
                    {task.status !== "todo" && (
                        <button onClick={() => moveTask(task.id, "todo")}>⬅</button>
                    )}

                    {task.status === "todo" && (
                        <button onClick={() => moveTask(task.id, "progress")}>➡</button>
                    )}

                    {task.status === "progress" && (
                        <button onClick={() => moveTask(task.id, "done")}>✔</button>
                    )}

                    <button onClick={() => deleteTask(task.id)}>🗑</button>
                </div>
            </div>
        </div>
    )
}

export default TaskCard
