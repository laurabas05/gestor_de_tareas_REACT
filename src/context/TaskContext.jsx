import { createContext, useContext, useEffect, useState } from "react"

// creo el contexto
const TaskContext = createContext()

// este componente envuelve toda la app, por eso ({children})
export const TaskProvider = ({ children }) => {
    // se cargan las tareas guardadas desde el local storage.
    // en caso de q no hayan tareas, se empieza con un array vacío.
    // esto hará q las tareas no se borren si se recarga la página.
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem("tasks")
        return storedTasks ? JSON.parse(storedTasks) : []
    })

    // search guardará el texto del buscador
    const [search, setSearch] = useState("")

    // darkMode guardará si el modo oscuro está activo, es decir, un boolean
    const [darkMode, setDarkMode] = useState(() => {
        // lo recupero desde el localStorage para mantener también
        // el tema cuando recargue la página.
        return localStorage.getItem("darkMode") === "true"
    })

    // cada vez q cambian las tareas, se guarda la nueva version.
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    // se guarda también el modo
    useEffect(() => {
        localStorage.setItem("darkMode", darkMode)
    }, [darkMode])

    // añadimos una tarea haciendo copia del array.
    // lo q hace exactamente es coger la lista q ya tenemos,
    // y le pegamos la nueva al final.
    const addTask = (task) => {
        setTasks([...tasks, task])
    }

    // borramos tarea con filter.
    // crea una lista nueva donde no esté la que tenga la id
    // que queremos borrar.
    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    // movemos la tarea de estado con map.
    // busca una tarea por su id y le cambia el estado.
    const moveTask = (id, newStatus) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, status: newStatus } : task
            )
        )
    }

    // aquí repartimos lo que los demás componentes queremos que usen.
    return (
        <TaskContext.Provider value={{ tasks, addTask, deleteTask, moveTask, search, setSearch, darkMode, setDarkMode }}>
            {children}
        </TaskContext.Provider>
    )
}

// atajo para usar el contexto y quede más limpio
export const useTasks = () => useContext(TaskContext)
