import {
  forwardRef,
  InputHTMLAttributes,
  PropsWithChildren,
  useId,
} from "react";
import { AudioPreview, ImagePreview } from "./Preview";
import styles from "./Upload.module.css";
import { AddPhotoIcon, CloudUploadIcon } from "../../../../assets";

type FileProps = InputHTMLAttributes<HTMLInputElement> & {
  accept?: string;
  label?: string;
  helperText?: string;
  fileType?: "image" | "audio";
};

const File = ({ children }: PropsWithChildren) => {
  return <div className={styles.file}>{children}</div>;
};

const Input = forwardRef<HTMLInputElement, FileProps>(
  ({ accept, label, fileType, required, helperText = "", ...rest }, ref) => {
    const inputID = useId();

    const hasError = helperText.length > 0;
    return (
      <>
        <label
          className={`${styles.label} ${required && styles.required}`}
          htmlFor={inputID}
        >
          {label}
        </label>
        <div className={styles.container}>
          <label htmlFor={inputID} className={styles.custom_file_upload}>
            {fileType === "image" ? (
              <AddPhotoIcon className={styles.icon} />
            ) : (
              <CloudUploadIcon
                className={styles.icon}
                style={{ marginTop: "50px" }}
              />
            )}
          </label>
          <input
            id={inputID}
            {...rest}
            type="file"
            className={`${styles.file_drop_zone}`}
            accept={accept}
            ref={ref}
          />
          {hasError && <span className={styles.helper_text}>{helperText}</span>}
        </div>
      </>
    );
  }
);

File.AudioPreview = AudioPreview;
File.ImagePreview = ImagePreview;
File.Input = Input;

export default File;
