import { forwardRef, InputHTMLAttributes, useId } from "react";
import styles from "./CheckBox.module.css";
import Item from "../../Item";
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  title: string;
  year: string;
  author: string;
  image?: string;
  value: string;
  error?: string;
  helperText?: string;
  fileType?: string;
};

export const CheckBox = forwardRef<HTMLInputElement, InputProps>(
  ({ title, year, author, image, value, helperText = "", ...props }, ref) => {
    const inputId = useId();
    const hasError = helperText.length > 0;
    return (
      <>
        <label htmlFor={inputId} className={styles.label}>
          <img src={image} className={styles.image} alt="placeholder" />
          <Item.Column
            padding="var(--spacing-10)"
            paddingLeft="var(--spacing-25)"
            align="baseline"
            gap="var(--spacing-15)"
            width="60%"
          >
            <Item.Title>{title}</Item.Title>
            <Item.OneDate initial="" date={year}></Item.OneDate>
            <Item.Subtitle>{author}</Item.Subtitle>
          </Item.Column>
          <Item.Column width="20%" align="center">
            <input
              id={inputId}
              className={`${styles.checkbox} ${hasError ? styles.error : ""}`}
              type="checkbox"
              ref={ref}
              {...props}
              value={value}
            />
          </Item.Column>
        </label>
        {hasError && <span className={styles.helper_text}>{helperText}</span>}
      </>
    );
  }
);
