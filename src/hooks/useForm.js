import { useState } from "react"

// defino custom hook
export const useForm = (initialValues) => {
    // values guarda todos los campos del formulario en un objeto
    const [values, setValues] = useState(initialValues)

    // cuando se escribe en cualquier input:
    const handleChange = (e) => {
        const { name, value } = e.target // mira lo q se escribe en el input según su name
        setValues({
            ...values, // hace una copia de lo q ya teníamos
            [name]: value // actualiza solo el campo q cambió
        })
    }

    // devuelve el formulario a su estado inicial (valores vacíos)
    const resetForm = () => {
        setValues(initialValues)
    }

    return { values, handleChange, resetForm }
}
