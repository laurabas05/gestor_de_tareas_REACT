import { useState } from "react"

export const useForm = (initialValues) => {
    // guarda las tareas
    const [values, setValues] = useState(initialValues)

    // cuando se pulsa una tecla en cualquier input:
    const handleChange = (e) => {
        const { name, value } = e.target // mira el name del input y lo q se escribio
        setValues({
            ...values, // hace una copia de lo q ya teníamos
            [name]: value // actualiza solo el campo q cambió
        })
    }

    // le dice al estado q vuelva a estar vacío
    const resetForm = () => {
        setValues(initialValues)
    }

    return { values, handleChange, resetForm }
}
