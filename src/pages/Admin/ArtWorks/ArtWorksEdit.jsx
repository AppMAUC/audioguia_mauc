// CSs
import "../Profile/AdminProfile.css";

import { uploads } from "../../../utils/config";

// hooks
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useForm from '../../../hooks/useForm';

// redux
import { updateArtWork, resetMessage, deleteArtWork } from "../../../slices/artWorkSlice";

// components
import Message from "../../../components/feedback/Message";
import AudioPlayer from 'react-h5-audio-player';
import { useArtWorks } from "../../../hooks/useArtWorks";
import { BsXLg } from "react-icons/bs";


const ArtWorksEdit = () => {

    const { id } = useParams();

    const { artWork, loading, error, message } = useArtWorks(id);
    const [formValues, handleInputChange, handleSet, handleChangeFile, handleSubmit, handleDelete] = useForm({});
    const [previewImage, setPreviewImage] = useState("");
    const [previewAudio, setPreviewAudio] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        if (artWork) {

            if (artWork.date) {
                let date = artWork.date;
                let stringDate = date.toString();
                setDate(stringDate.slice(0, 10));
            }

            handleSet(artWork);
        }
    }, [artWork]);


    return (
        <div id='edit-profile'>
            <h2>Edite os dados da obra</h2>
            <p className='subtitle'> Mudar Imagem</p>
            {(formValues?.image || previewImage) && (
                <img
                    className="profile-image"
                    src={
                        previewImage || `${uploads}/images/artworks/${formValues.image}`
                    }
                    alt={formValues?.title}
                />
            )}
            {(formValues.audio_desc || previewAudio) && (
                <AudioPlayer
                    src={previewAudio || `${uploads}/audios/artworks/${formValues.audio_desc}`}
                // Outras props aqui
                />
            )}
            <form onSubmit={(e) => handleSubmit(e, updateArtWork, resetMessage, '/admin/artworks')}>
                <input
                    type="text"
                    placeholder='Nome'
                    name="title"
                    onChange={handleInputChange}
                    value={formValues.title || ""}
                />
                <input
                    type="text"
                    placeholder='Descrição Parcial'
                    name="partial_desc"
                    value={formValues.partial_desc || ""}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder='Descrição Completa'
                    name="complete_desc"
                    value={formValues.complete_desc || ""}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder='Autor'
                    name="author"
                    value={formValues.author || ""}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder='Suporte'
                    name="suport"
                    value={formValues.complete_desc || ""}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder='Insira as dimensões da data'
                    name="dimension"
                    value={formValues.dimension || ""}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder='Insira a coleção'
                    name="colection"
                    value={formValues.colection || ""}
                    onChange={handleInputChange}
                />
                <label htmlFor="date">
                    <span>Insira a data da obra:</span>
                </label>
                <input
                    type="date"
                    name="date"
                    value={date || ""}
                    onChange={(e) => { setDate(e.target.value); handleInputChange(e) }}
                />
                <label>
                    <span>Imagem:</span>
                    <input type="file" name="image" accept="image/png, image/jpeg" onChange={(e) => { setPreviewImage(URL.createObjectURL(e.target.files[0])); handleChangeFile(e) }} />
                </label>
                <label>
                    <span>Audio:</span>
                    <input type="file" name="audio_desc" accept="audio/mpeg" onChange={(e) => { setPreviewAudio(URL.createObjectURL(e.target.files[0])); handleChangeFile(e) }} />
                </label>


                {!loading && <input type="submit" value="Atualizar" />}
                {loading && <input type="submit" value="Aguarde..." disabled />}
                {error && <Message msg={error} type={"error"} />}
                {message && <Message msg={message} type={"success"} />}
            </form>
            <BsXLg onClick={(e) => handleDelete(e, deleteArtWork, resetMessage, '/admin/artworks', id )}/>
        </div>
    );
};

export default ArtWorksEdit;