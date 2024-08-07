import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addSuffixToFileName } from "../utils/formatFile";

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

    const handleChangeArrayFile = (event, lang) => {
        event.preventDefault();

        const { audioDesc } = values;

        // Adicionar sufixo ao arquivo
        const suffix = lang === 'br' ? 'br' : 'en';
        const fileWithSuffix = addSuffixToFileName(event.target.files[0], suffix);

        // Atualizar o array audioDesc com base no idioma
        const newAudioDesc = [...audioDesc];
        if (lang === 'br') {
            newAudioDesc[0] = fileWithSuffix;
        } else if (lang === 'en') {
            newAudioDesc[1] = fileWithSuffix;
        }

        setValues({ ...values, [event.target.name]: newAudioDesc });
    };


    const handleSet = (data) => {
        setValues({ ...data });
    };

    const handleSubmit = async (e, action, reset, link = '/', error, form = true) => {
        e.preventDefault();

        const data = {
            ...values
        };

        // build form data
        const formData = new FormData();

        Object.keys(data).forEach((key) => {

            if (key == 'audioDesc') {
                for (let i = 0; i < data[key].length; i++) {
                    formData.append(key, data[key][i]);
                }
            } else {
                formData.append(key, data[key])
            }
        });

        if (form) {
            await dispatch(action(formData));
        } else {
            await dispatch(action(data));
        }

        setTimeout(() => {
            if (!error) {
                dispatch(reset());
                navigate(link);
            }
        }, 3000);
    }

    const handleDelete = async (e, action, reset, link = '/', id) => {
        e.preventDefault();

        dispatch(action(id));

        setTimeout(() => {
            dispatch(reset());
            navigate(link);
        }, 2000);
    }

    return [values, handleInputChange, handleSet, handleChangeFile, handleSubmit, handleDelete, handleChangeArrayFile];
};


export default useForm;