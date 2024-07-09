import '../../Auth/Auth.css';

// Components
import { Link } from 'react-router-dom';
import Message from '../../../components/feedback/Message';
import AudioPlayer from 'react-h5-audio-player';

// Hooks
import { useState, useEffect } from 'react';
import useForm from '../../../hooks/useForm';

// Redux
import { registerArtWork, resetMessage } from '../../../slices/artWorkSlice';
import { useArtWorks } from '../../../hooks/useArtWorks';

const ArtWorkRegister = () => {

    const { error, message, loading } = useArtWorks();
    const [formValues, handleInputChange, handleSet, handleChangeFile, handleSubmit] = useForm({});
    const [previewImage, setPreviewImage] = useState("");
    const [previewAudio, setPreviewAudio] = useState("");



    return (
        <div id='register'>
            <h2>ArtWork</h2>
            {previewImage && (
                <img
                    className="profile-image"
                    src={
                        previewImage || ''
                    }
                    alt={formValues?.title}
                />
            )}
            {previewAudio && (
                <AudioPlayer
                    src={previewAudio || ''}
                // Outras props aqui
                />
            )}
            <form onSubmit={(e) => handleSubmit(e, registerArtWork, resetMessage, '/admin/artworks')}>
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
                    value={formValues.suport || ""}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder='Insira as dimensões da obra'
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
                    onChange={handleInputChange}
                />
                <label>
                    <span>Imagem:</span>
                    <input type="file" name="image" accept="image/png, image/jpeg" onChange={(e) => { setPreviewImage(URL.createObjectURL(e.target.files[0])); handleChangeFile(e) }} />
                </label>
                <label>
                    <span>Audio:</span>
                    <input type="file" name="audio_desc" accept="audio/mpeg" onChange={(e) => { setPreviewAudio(URL.createObjectURL(e.target.files[0])); handleChangeFile(e) }} />
                </label>


                {!loading && <input type="submit" value="Registrar" />}
                {loading && <input type="submit" value="Aguarde..." disabled />}
                {error && <Message msg={error} type={"error"} />}
                {message && <Message msg={message} type={"success"} />}
            </form>


        </div>
    )
}

export default ArtWorkRegister;