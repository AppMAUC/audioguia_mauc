import { Link } from "react-router-dom";
import { uploads } from "../../utils/config";
import "../Admin/Profile/AdminProfile.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
// hooks

import { useParams } from "react-router-dom";
import { useArtWorks } from "../../hooks/useArtWorks";
import { showDate } from "../../utils/formatDate";
import { useEffect, useState } from "react";

// redux

const ArtWork = () => {
  const { id } = useParams();

  const { artWork, loading } = useArtWorks(id);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="art-work">
      <h1>{artWork.title}</h1>
      <p>Partial Description: {artWork.partialDesc}</p>
      <p>Complete Description: {artWork.completeDesc}</p>

      {artWork.image && (
        <img
          className="profile-image"
          src={artWork.image.url}
          alt={artWork.title}
        />
      )}
      {artWork.audioDesc &&
        artWork.audioDesc.map((item) => (
          <div key={item.key}>
            <AudioPlayer
              autoPlay
              src={item.url}
              onPlay={() => console.log("Áudio reproduzido")}
              // Outras props aqui
            />
          </div>
        ))}
      {artWork.audioGuia &&
        artWork.audioGuia.map((item) => (
          <div key={item.key}>
            <AudioPlayer
              autoPlay
              src={item.url}
              onPlay={() => console.log("Áudio reproduzido")}
              // Outras props aqui
            />
          </div>
        ))}

      <p>Author: {artWork.author}</p>
      <p>Support: {artWork.suport}</p>
      <p> Ano: {artWork?.year}</p>
      <p>Dimensions: {artWork.dimension}</p>
    </div>
  );
};

export default ArtWork;
