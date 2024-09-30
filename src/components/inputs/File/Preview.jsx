import AudioPlayer from "react-h5-audio-player";
import { usePreview } from "../hooks/usePreview";

export const AudioPreview = ({ file, folder, type }) => {
  const preview = usePreview(file, `audios/${folder}/${type}`);

  if (!preview) return null;

  return <AudioPlayer className="preview audio" src={preview} />;
};

export const ImagePreview = ({ file, alt, folder }) => {
  const preview = usePreview(file, `images/${folder}`);

  if (!preview) return null;

  return <img src={preview} alt={alt} className="profile-image" />;
};
