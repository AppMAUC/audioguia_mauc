import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useForm = (initialValues) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [values, setValues] = useState(initialValues);

    const handleInputChange = (event) => {
        event.preventDefault()
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleChangeFile = (event, index = 0) => {
        event.preventDefault()
        setValues({ ...values, [event.target.name]: event.target.files[index] });
    };

    const handleSet = (data) => {
        setValues({ ...data });
    };

    const handleSubmit = async (e, action, reset, link = '/') => {
        e.preventDefault();

        const data = {
            ...values
        };

        // build form data
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            formData.append(key, data[key])
        });

        await dispatch(action(formData));

        setTimeout(() => {
            dispatch(reset());
            navigate(link);
        }, 2000);
    }

    const handleDelete = async (e, action, reset, link = '/', id) => {
        e.preventDefault();


        dispatch(action(id));

        setTimeout(() => {
            dispatch(reset());
            navigate(link);
        }, 3000);
    }

    return [values, handleInputChange, handleSet, handleChangeFile, handleSubmit, handleDelete];
};


export default useForm;