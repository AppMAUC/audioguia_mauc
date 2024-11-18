import styles from "./Button.module.css";
import { PropsWithChildren } from "react";

import { ButtonHTMLAttributes } from "react";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
