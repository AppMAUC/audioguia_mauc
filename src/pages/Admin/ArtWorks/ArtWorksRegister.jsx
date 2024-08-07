import '../Profile/AdminProfile.css';

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
    const [formValues, handleInputChange, handleSet, handleChangeFile, handleSubmit, handleDelete, handleChangeArrayFile] = useForm({
        audio_desc: []
    });
    const [previewImage, setPreviewImage] = useState("");
    const [previewAudio, setPreviewAudio] = useState("");
    const [previewAudioS, setPreviewAudioS] = useState("");


    console.log(formValues)
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
            {previewAudioS && (
                <AudioPlayer
                    src={previewAudioS || ''}
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
                    name="partialDesc"
                    value={formValues.partialDesc || ""}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder='Descrição Completa'
                    name="completeDesc"
                    value={formValues.completeDesc || ""}
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
                <label htmlFor="year">
                    <span>Insira a data da obra:</span>
                </label>
                <input
                    type="text"
                    name="year"
                    onChange={handleInputChange}
                />
                <label>
                    <span>Imagem:</span>
                    <input type="file" name="image" accept="image/png, image/jpeg" onChange={(e) => { setPreviewImage(URL.createObjectURL(e.target.files[0])); handleChangeFile(e) }} />
                </label>
                <label>
                    <span>Audio br:</span>
                    <input type="file" name="audioDesc" multiple accept="audio/mpeg" onChange={(e) => { setPreviewAudio(URL.createObjectURL(e.target.files[0])); handleChangeArrayFile(e, 'br') }} />
                </label>
                <label>
                    <span>Audio en:</span>
                    <input type="file" name="audioDesc" accept="audio/mpeg" onChange={(e) => { setPreviewAudioS(URL.createObjectURL(e.target.files[0])); handleChangeArrayFile(e, 'en') }} />
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