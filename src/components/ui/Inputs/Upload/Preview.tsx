import { usePreview } from "./usePreview";
import styles from "./Upload.module.css";
import Mobile from "../../Mobile";

export interface PreviewProps {
  file: string | File;
  alt?: string;
}

export const AudioPreview = ({ file }: PreviewProps) => {
  const preview = usePreview(file);
  if (!preview) return null;

  return <Mobile.AudioPlayer src={preview} type="audio/mpeg" />;
};

export const ImagePreview = ({ file, alt }: PreviewProps) => {
  const preview = usePreview(file);

  if (!preview) return null;

  return <img src={preview} alt={alt} className={styles.preview} />;
};

export const Image = ({ file, alt }: { file: string; alt: string }) => {
  return <img src={file} alt={alt} className={styles.preview} />;
};
