import { forwardRef, InputHTMLAttributes, useId } from "react";
import styles from "./Input.module.css";
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  fileType?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "", name = "", label = "", helperText = "", ...props }, ref) => {
    const inputId = useId();
    const hasError = helperText.length > 0;
    return (
      <div className={styles.container}>
        <label
          className={`${styles.label} ${props.required && styles.required}`}
          htmlFor={inputId}
        >
          {label}
        </label>
        <input
          id={inputId}
          className={`${styles.input} ${hasError ? styles.error : ""}`}
          type={type}
          name={name}
          ref={ref}
          {...props}
        />
        {hasError && <span className={styles.helper_text}>{helperText}</span>}
      </div>
    );
  }
);
