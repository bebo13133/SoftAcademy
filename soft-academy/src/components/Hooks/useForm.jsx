import { useState } from "react"

export const useForm = (initialValues, onSubmitHandler) => {

    const [values, setValues] = useState(initialValues)


    const onChangeHandler = (e) => {

        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
    }


    const onSubmit = (e) => {
        e.preventDefault()
        if (onSubmitHandler) onSubmitHandler(values);
        setValues(initialValues)

    }

    // const onChangeValues = (newValues) => {

    //     setValues(newValues)
    // }

    return {
        onChangeHandler,
        values,
        onSubmit,
        // onChangeValues
    }
}