import { forwardRef } from "react";
import { AudioPreview, ImagePreview } from "./Preview";
import styles from "./File.module.css";

const File = ({ children }) => {
  return <div className={styles["input-file"]}>{children}</div>;
};

const Input = forwardRef(({ accept, ...rest }, ref) => {
  return (
    <>
      <input
        className={`${styles["input-file"]} item`}
        {...rest}
        type="file"
        accept={accept}
        ref={ref}
      />
    </>
  );
});

File.AudioPreview = AudioPreview;
File.ImagePreview = ImagePreview;
File.Input = Input;

export default File;
