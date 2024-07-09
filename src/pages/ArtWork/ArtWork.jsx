import { Link } from "react-router-dom";
import { uploads } from "../../utils/config";
import "../Admin/Profile/AdminProfile.css";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// hooks

import { useParams } from "react-router-dom";
import { useArtWorks } from "../../hooks/useArtWorks";

// redux


const ArtWork = () => {

    const { id } = useParams();

    const { artWork, loading } = useArtWorks(id);

    if (loading) {
        return <p>Carregando...</p>
    };

    return (
        <div id='art-work'>
            <h1>{artWork.title}</h1>
            <p>Partial Description: {artWork.partial_desc}</p>
            <p>Complete Description: {artWork.complete_desc}</p>

            {artWork.image && (
                <img className="profile-image" src={`${uploads}/images/artworks/${artWork.image}`} alt={artWork.title} />
            )}
            {artWork.audio_desc && (
                // <audio controls>
                //     <source src={`${uploads}/audios/artWork/${artWork.audio_desc}`} type="audio/mpeg" />
                //     Your browser does not support the audio element.
                // </audio>
                <AudioPlayer
                    src={`${uploads}/audios/artworks/${artWork.audio_desc}`}
                    onPlay={() => console.log('Áudio reproduzido')}
                // Outras props aqui
                />
            )}

            <p>Author: {artWork.author}</p>
            <p>Collection: {artWork.colection}</p>
            <p>Support: {artWork.suport}</p>
            <p>Date: {artWork.date}</p>
            <p>Dimensions: {artWork.dimension}</p>


        </div>
    );
};

export default ArtWork;